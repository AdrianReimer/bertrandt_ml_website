<template>
    <div>
      <TheAudio />
    </div>
</template>

<script>
import Vue from 'vue';
import Meyda from 'meyda';
import tfjs from '@tensorflow/tfjs';
import TheAudio from './TheAudio.vue';

export default {
  components: {
    TheAudio,
  },
  data() {
    return {
      model: NaN,
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
      silence: true,
      isReset: true,
      curMfcc: this.DEFAULT_MFCC_VALUE,
      curRms: 0,
      curBuffer: 0,
      mfccHistory: [],
      canvas: 0,
      ctx: 0,
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
      const mfccCanvas = document.getElementById('mfcc');
      const mfccCtx = mfccCanvas.getContext('2d');
      if (this.mfccHistory.length) {
        const x = this.mfccHistory.length - 1;
        for (let y = 0; y < this.mfccHistory[x].length; y += 1) {
          const colorStr = this.mfccHistory[x][y];
          // setting color
          if (this.mfccHistory[x][y] >= -300) {
            mfccCtx.fillStyle = `rgb(255, ${
              this.greenColor + colorStr
            },${
              this.blueColor + colorStr
            })`;
          } else {
            mfccCtx.fillStyle = `rgb(${
              this.redColor + colorStr
            },${
              this.greenColor + colorStr
            }, 255)`;
          }
          // drawing the rectangle
          mfccCtx.fillRect(x * this.boxWidth,
            y * this.boxHeight,
            this.boxWidth,
            this.boxHeight);
        }
      }
    },

    plot_buffer() {
      const bufferCanvas = document.getElementById('buffer');
      const bufferCtx = bufferCanvas.getContext('2d');
      if (this.curBuffer.length) {
        bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
        let bufferIdx = 0;
        for (let i = 0; i < this.curBuffer.length; i += 1) {
          const colorStr = this.curBuffer[i] * 500;
          // setting color
          bufferCtx.fillStyle = 'rgb(30, 30, 30)';
          // drawing the rectangle
          bufferCtx.fillRect(bufferIdx,
            colorStr + 100,
            1.5,
            1.5);
          bufferIdx += 1;
        }
      }
    },

    loadModel() {
      tfjs.loadLayersModel('https://www.adrianreimer.com/assets/model/model.json').then((loadedModel) => {
        this.model = loadedModel;
      });
    },

    show(features) {
      // update spectral data size
      this.curMfcc = features[this.mfccName];
      this.curRms = features[this.rmsName];
      this.curBuffer = features[this.bufferName];
    },

    setup() {
      // create meyda analyzer
      // and connect to mic source
      this.onMicDataCall([this.mfccName, this.rmsName, this.bufferName], this.show)
        .then((meydaAnalyzer) => {
          meydaAnalyzer.start();
        }).catch((err) => {
          alert(err);
        });
    },

    draw() {
      // append new mfcc values
      if (this.curRms > this.ThresRms) {
        this.mfccHistory.push(this.curMfcc);
        this.silence = false;
      }
      // plot new mfcc snippet
      this.plot_mfcc();
      this.plot_buffer();
      // predict output
      if (this.mfccHistory.length === this.mfccHistMaxLen) {
        document.getElementById('prediction').style.visibility = 'hidden';
        document.getElementById('loadingCircle').style.visibility = 'visible';
        const input = this.mfccHistory.slice();
        this.mfccHistory = [];
        const stacked = tfjs.stack([input, input, input], tfjs.axis = -1);
        const reshaped = stacked.reshape([1, 40, 261, 3]);
        const modelPred = this.model.predict(reshaped);
        const predLabel = this.labelDict[tfjs.argMax(modelPred, tfjs.axis = 1).dataSync()];
        this.displayPred(predLabel);
        document.getElementById('loadingCircle').style.visibility = 'hidden';
        document.getElementById('prediction').style.visibility = 'visible';
        this.savePrediction(predLabel);
      }
    },

    playTriggersound(predLabel) {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('trigger0', {}, `${user.name}trigger`).then((doc) => {
          if (doc.value === predLabel) {
            this.playTrigger(1);
          }
        }).catch((err) => {
          console.log(err);
        });
        this.$pouch.get('trigger1', {}, `${user.name}trigger`).then((doc) => {
          if (doc.value === predLabel) {
            this.playTrigger(2);
          }
        }).catch((err) => {
          console.log(err);
        });
        this.$pouch.get('trigger2', {}, `${user.name}trigger`).then((doc) => {
          if (doc.value === predLabel) {
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
          doc.value = this.triggerSoundVolume;
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
        Vue.prototype.stopDraw = this.stopDraw;
        this.setup();
        Vue.prototype.drawFuncIntervalId = setInterval(this.draw, 16);
        Vue.prototype.drawFuncIsAct = true;
      }
    },

    stopDraw() {
      clearInterval(Vue.prototype.drawFuncIntervalId);
      Vue.prototype.drawFuncIsAct = undefined;
    },
  },
  mounted() {
    this.start();
  },
};
</script>
