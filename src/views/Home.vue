<template>
  <section id="home">
    <AudioFeatures />
    <Sketch />
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <ons-list-item tappable id="resumeBtn"
          @click="resumePrediction()">
          <v-ons-button> <i class="fa fa-play fa-fw"></i> </v-ons-button>
          Resume prediction
        </ons-list-item>
        <v-ons-list-header style="font-size: 4vmin">Input</v-ons-list-header>
        <v-ons-card id="inputRect" tappable @click="$router.push('/home/selection')">
        </v-ons-card>
        <v-ons-list-header style="font-size: 4vmin">Output</v-ons-list-header>
        <v-ons-card>
          <v-ons-progress-circular id="loadingCircle" indeterminate>
          </v-ons-progress-circular>
          <div id="prediction"></div>
        </v-ons-card>
      </v-ons-list>
    </v-ons-page>
  </section>
</template>

<script>
import Vue from 'vue';
import Sketch from '../components/Sketch.vue';
import AudioFeatures from '../components/AudioFeatures.vue';

export default {
  components: {
    Sketch, AudioFeatures,
  },
  mounted() {
    this.loadTut();
    this.loadPlot();
  },
  methods: {
    resumePrediction() {
      document.getElementById('resumeBtn').remove();
      Vue.prototype.stopDraw();
      Vue.prototype.audioCtx.resume();
      Vue.prototype.start();
    },

    loadPlot() {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('plot', {}, `${user.name}home`).then((doc) => {
          document.getElementById(`${doc.plotType}Bar`).style.visibility = 'visible';
          document.getElementById('inputRect').appendChild(document.getElementById(`${doc.plotType}Bar`));
        }).catch((err) => {
          console.error(err);
          this.addDefaultPlot();
        });
      }).catch((err) => {
        console.log(err);
        this.addDefaultPlot();
      });
    },

    addDefaultPlot() {
      document.getElementById('mfccBar').style.visibility = 'visible';
      document.getElementById('inputRect').appendChild(document.getElementById('mfccBar'));
    },

    loadTut() {
      this.$pouch.get('tutorial', {}, 'tutorial').then(() => {
      }).catch(() => {
        this.$router.push('/tutorial');
      });
    },
  },
};
</script>

<style lang="css">
  #loadingCircle {
    position: relative;
    visibility: hidden;
    font-size: 8vmin;
  }
  #prediction {
    position: relative;
    visibility: hidden;
    font-size: 8vmin;
  }
</style>
