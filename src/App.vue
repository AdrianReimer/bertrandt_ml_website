<template>
  <div>
    <TheNavbar />
    <router-view />
  </div>
</template>

<script>
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import PouchDB from 'pouchdb-browser';
import PouchFind from 'pouchdb-find';
import PouchLiveFind from 'pouchdb-live-find';
import PouchVue from 'pouch-vue';
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import Meyda from 'meyda';
import TheNavbar from './components/TheNavbar.vue';

PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);
Vue.use(PouchVue, {
  pouch: PouchDB,
});
Vue.use(VueOnsen);

export default {
  components: {
    TheNavbar,
  },
  mounted() {
    // create meyda analyzer
    // and connect to mic source
    this.onMicDataCall(['mfcc', 'buffer'], this.show)
      .then((meydaAnalyzer) => {
        Vue.prototype.meydaAnalyzer = meydaAnalyzer;
        Vue.prototype.meydaAnalyzer.start();
      }).catch((err) => {
        alert(err);
      });
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

    show(features) {
      // update spectral data size
      Vue.prototype.curMfcc = features[this.mfccName];
      Vue.prototype.curRms = features[this.rmsName];
      Vue.prototype.curBuffer = features[this.bufferName];
    },
  },
};
</script>
