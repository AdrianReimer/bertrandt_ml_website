<template>
    <div>
      <TheAudio />
    </div>
</template>

<script>
import Vue from 'vue';
import Meyda from 'meyda';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
import TheAudio from './TheAudio.vue';

export default {
  components: {
    TheAudio,
  },
  data() {
    return {
      labelDict: {
        0: 'Angry',
        1: 'Disgusted',
        2: 'Scared',
        3: 'Happy',
        4: 'Neutral',
        5: 'Sad',
        6: 'Surprised',
        7: 'Calm',
      },
      mfccVal: new Array(261),
      mfccName: 'mfcc',
      rmsName: 'rms',
      bufferName: 'buffer',
      ThresRms: 0.001,
      mfccHistMaxLen: 261,
      boxWidth: 5,
      boxHeight: 5,
      redColor: 150,
      greenColor: 144,
      blueColor: 120,
      defaultMfcc: new Array(40).fill(1),
      curMfcc: new Array(40).fill(1),
      curRms: 0,
      curBuffer: 0,
      mfccHistory: [],
      canvas: 0,
      ctx: 0,
      mfccCanvas: 0,
      mfccCtx: 0,
      bufferCanvas: 0,
      bufferCtx: 0,
      loadingIsVisible: false,
    };
  },
  methods: {
    /*
    get new audio
    context object
    */
    createAudioCtx() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    },

    /*
    create microphone
    audio input source from
    audio context
    */
    createMicSrcFrom(audioCtx) {
      return new Promise((resolve, reject) => {
        const constraints = { audio: true, video: false };
        navigator.mediaDevices.getUserMedia(constraints)
          .then((stream) => {
            const src = audioCtx.createMediaStreamSource(stream);
            resolve(src);
          }).catch((err) => { reject(err); });
      });
    },

    /*
    call given function
    on new microphone analyser
    data
    */
    onMicDataCall(features, callback) {
      return new Promise((resolve, reject) => {
        const audioCtx = this.createAudioCtx();
        this.createMicSrcFrom(audioCtx)
          .then((src) => {
            const analyzer = Meyda.createMeydaAnalyzer({
              audioContext: audioCtx,
              source: src,
              bufferSize: 512,
              featureExtractors: features,
              callback,
              numberOfMFCCCoefficients: 40,
            });
            resolve(analyzer);
          }).catch((err) => {
            reject(err);
          });
      });
    },

    plot_mfcc() {
      if (this.mfccHistory.length) {
        let x = this.mfccHistory.length - 1;
        for (let y = 0; y < this.mfccHistory[x].length; y += 1) {
          // setting color
          if (this.mfccHistory[x][y] >= -300) {
            this.mfccCtx.fillStyle = `rgb(255, ${
              this.greenColor + this.mfccHistory[x][y]
            },${
              this.blueColor + this.mfccHistory[x][y]
            })`;
          } else {
            this.mfccCtx.fillStyle = `rgb(${
              this.redColor + this.mfccHistory[x][y]
            },${
              this.greenColor + this.mfccHistory[x][y]
            }, 255)`;
          }
          // drawing the rectangle
          this.mfccCtx.fillRect(x * this.boxWidth,
            y * this.boxHeight,
            this.boxWidth,
            this.boxHeight);
        }
        x = 0;
      }
    },

    plot_buffer() {
      if (this.curBuffer.length) {
        this.bufferCtx.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        let bufferIdx = 0;
        for (let i = 0; i < this.curBuffer.length; i += 1) {
          const colorStr = this.curBuffer[i] * 500;
          // setting color
          this.bufferCtx.fillStyle = 'rgb(30, 30, 30)';
          // drawing the rectangle
          this.bufferCtx.fillRect(bufferIdx,
            colorStr + 100,
            1.5,
            1.5);
          bufferIdx += 1;
        }
      }
    },

    loadModel() {
      tf.loadLayersModel('https://www.adrianreimer.com:2020/model/model.json').then((loadedModel) => {
        Vue.prototype.model = loadedModel;
      });
    },

    show(features) {
      // update spectral data size
      this.curMfcc = features[this.mfccName];
      this.curRms = features[this.rmsName];
      this.curBuffer = features[this.bufferName];
    },

    setup() {
      this.mfccCanvas = document.getElementById('mfcc');
      this.mfccCtx = this.mfccCanvas.getContext('2d');
      this.bufferCanvas = document.getElementById('buffer');
      this.bufferCtx = this.bufferCanvas.getContext('2d');
      // create meyda analyzer
      // and connect to mic source
      this.onMicDataCall([this.mfccName, this.bufferName], this.show)
        .then((meydaAnalyzer) => {
          Vue.prototype.meydaAnalyzer = meydaAnalyzer;
          Vue.prototype.meydaAnalyzer.start();
        }).catch((err) => {
          alert(err);
        });
    },

    continue() {
      this.mfccCanvas = document.getElementById('mfcc');
      this.mfccCtx = this.mfccCanvas.getContext('2d');
      this.bufferCanvas = document.getElementById('buffer');
      this.bufferCtx = this.bufferCanvas.getContext('2d');
      console.log(Vue.prototype.meydaAnalyzer);
      Vue.prototype.meydaAnalyzer.start();
      Vue.prototype.drawFuncIntervalId = setInterval(this.draw, 16);
      Vue.prototype.drawFuncIsAct = true;
    },

    draw() {
      // append new mfcc values
      if (this.curRms > this.ThresRms) {
        this.mfccHistory.push(this.curMfcc);
      } else {
        this.mfccHistory.push(this.defaultMfcc);
      }
      // plot
      if (document.getElementById('bufferBar').style.visibility === 'visible') {
        this.plot_buffer();
      } else {
        this.plot_mfcc();
      }
      if (this.mfccHistory.length === 130) {
        // predict output
        this.predict(this.mfccHistory.slice());
        this.mfccHistory = [];
      }
    },

    toggleOutput() {
      if (this.loadingIsVisible) {
        document.getElementById('loadingCircle').style.visibility = 'hidden';
        document.getElementById('prediction').style.visibility = 'visible';
      } else {
        document.getElementById('prediction').style.visibility = 'hidden';
        document.getElementById('loadingCircle').style.visibility = 'visible';
      }
      this.loadingIsVisible = !this.loadingIsVisible;
    },

    async predict(input) {
      this.toggleOutput();
      const stacked = tf.stack([input, input, input]);
      const reshaped = stacked.reshape([1, 40, 130, 3]).arraySync();
      const Url = 'https://adr-ml.herokuapp.com/predict_api';
      axios.post(Url, reshaped)
        .then((response) => console.log(response));
      // const modelPred = Vue.prototype.model.predict(reshaped);
      // const predLabel = this.labelDict[tf.argMax(modelPred, tf.axis = 1).dataSync()];
      // this.playTriggersound(predLabel);
      // this.displayPred(predLabel);
      // this.toggleOutput();
      // this.savePrediction(predLabel);
    },

    savePrediction(predLabel) {
      // get current Day
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const day = `${dd}${mm}${year}`;
      const week = `${parseInt((dd / 7) + (mm * 4), 10)}${year}`;
      const month = `${mm}${year}`;
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        // save day data
        this.$pouch.get(`${day}${predLabel}`, {}, `${user.name}home`).then((doc) => {
          doc.value += 1;
          return this.$pouch.put(doc, {}, `${user.name}home`);
        }).catch(() => {
          const docInit = {
            _id: `${day}${predLabel}`,
            value: 1,
          };
          this.$pouch.put(docInit, {}, `${user.name}home`).then(() => {
            console.log('day data saved');
          }).catch((err) => {
            console.log(err);
          });
        });
        // save week data
        this.$pouch.get(`${week}${predLabel}`, {}, `${user.name}home`).then((doc) => {
          doc.value += 1;
          return this.$pouch.put(doc, {}, `${user.name}home`);
        }).catch(() => {
          const docInit = {
            _id: `${week}${predLabel}`,
            value: 1,
          };
          this.$pouch.put(docInit, {}, `${user.name}home`).then(() => {
            console.log('week data saved');
          }).catch((err) => {
            console.log(err);
          });
        });
        // save month data
        this.$pouch.get(`${month}${predLabel}`, {}, `${user.name}home`).then((doc) => {
          doc.value += 1;
          return this.$pouch.put(doc, {}, `${user.name}home`);
        }).catch(() => {
          const docInit = {
            _id: `${month}${predLabel}`,
            value: 1,
          };
          this.$pouch.put(docInit, {}, `${user.name}home`).then(() => {
            console.log('month data saved');
          }).catch((err) => {
            console.log(err);
          });
        });
        // save year data
        this.$pouch.get(`${year}${predLabel}`, {}, `${user.name}home`).then((doc) => {
          doc.value += 1;
          return this.$pouch.put(doc, {}, `${user.name}home`);
        }).catch(() => {
          const docInit = {
            _id: `${year}${predLabel}`,
            value: 1,
          };
          this.$pouch.put(docInit, {}, `${user.name}home`).then(() => {
            console.log('year data saved');
          }).catch((err) => {
            console.log(err);
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    playTriggersound(predLabel) {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('trigger0', {}, `${user.name}trigger`).then((doc) => {
          if (doc.state === true && doc.value === predLabel) {
            this.playTrigger(1);
          }
        }).catch((err) => {
          console.log(err);
        });
        this.$pouch.get('trigger1', {}, `${user.name}trigger`).then((doc) => {
          if (doc.state === true && doc.value === predLabel) {
            this.playTrigger(2);
          }
        }).catch((err) => {
          console.log(err);
        });
        this.$pouch.get('trigger2', {}, `${user.name}trigger`).then((doc) => {
          if (doc.state === true && doc.value === predLabel) {
            this.playTrigger(3);
          }
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    playTrigger(num) {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('triggerSoundVolume', {}, `${user.name}trigger`).then((doc) => {
          if (doc.value === undefined) {
            this.triggerSoundVolume = 50;
          } else {
            this.triggerSoundVolume = doc.value;
          }
          let audio;
          switch (num) {
            case 1:
              document.getElementById('Trigger1').volume = this.triggerSoundVolume / 100;
              audio = document.getElementById('Trigger1');
              audio.play();
              break;
            case 2:
              document.getElementById('Trigger2').volume = this.triggerSoundVolume / 100;
              audio = document.getElementById('Trigger2');
              audio.play();
              break;
            case 3:
              document.getElementById('Trigger3').volume = this.triggerSoundVolume / 100;
              audio = document.getElementById('Trigger3');
              audio.play();
              break;
            default:
          }
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err2) => {
        console.log(err2);
      });
    },

    displayPred(predLabel) {
      switch (predLabel) {
        case this.labelDict[0]:
          document.getElementById('prediction').innerHTML = '&#x1F620;';
          break;
        case this.labelDict[1]:
          document.getElementById('prediction').innerHTML = '&#x1F92E;';
          break;
        case this.labelDict[2]:
          document.getElementById('prediction').innerHTML = '&#x1F628;';
          break;
        case this.labelDict[3]:
          document.getElementById('prediction').innerHTML = '&#x1F600;';
          break;
        case this.labelDict[4]:
          document.getElementById('prediction').innerHTML = '&#x1F610;';
          break;
        case this.labelDict[5]:
          document.getElementById('prediction').innerHTML = '&#x1F62D;';
          break;
        case this.labelDict[6]:
          document.getElementById('prediction').innerHTML = '&#x1F632;';
          break;
        case this.labelDict[7]:
          document.getElementById('prediction').innerHTML = '&#x1F60E;';
          break;
        default:
      }
    },

    start() {
      if (Vue.prototype.drawFuncIsAct === undefined) {
        this.loadModel();
        Vue.prototype.stopDraw = this.stopDraw;
        this.setup();
      } else {
        this.continue();
      }
    },

    stopDraw() {
      clearInterval(Vue.prototype.drawFuncIntervalId);
      Vue.prototype.drawFuncIsAct = false;
    },
  },
  mounted() {
    this.start();
  },
};
</script>
