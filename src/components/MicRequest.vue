<template>
    <div id="micRequest">
    </div>
</template>

<script>
import Vue from 'vue';
import Meyda from 'meyda';

export default {
  mounted() {
    this.init();
  },
  methods: {
    /*
    get new audio
    context object
    */
    createAudioCtx() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      Vue.prototype.audioCtx = new AudioContext();
      return Vue.prototype.audioCtx;
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

    show(features) {
      // update spectral data size
      Vue.prototype.curMfcc = features.mfcc;
      Vue.prototype.curRms = features.rms;
      Vue.prototype.curBuffer = features.buffer;
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

    init() {
      this.onMicDataCall(['mfcc', 'rms', 'buffer'], this.show)
        .then((meydaAnalyzer) => {
          meydaAnalyzer.start();
        }).catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
