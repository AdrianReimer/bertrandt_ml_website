<template>
  <section id="home">
    <AudioFeatures />
    <Sketch />
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <v-ons-list-header>Input</v-ons-list-header>
        <v-ons-card id="inputRect" tappable @click="$router.push('/home/selection')">
        </v-ons-card>
        <v-ons-list-header>Output</v-ons-list-header>
        <v-ons-card>
          <v-ons-progress-circular indeterminate></v-ons-progress-circular>
        </v-ons-card>
      </v-ons-list>
    </v-ons-page>
  </section>
</template>

<script>
import Sketch from '../components/Sketch.vue';
import AudioFeatures from '../components/AudioFeatures.vue';

export default {
  components: {
    Sketch, AudioFeatures,
  },
  mounted() {
    this.loadPlot();
  },
  methods: {
    loadPlot() {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('plot', {}, `${user.name}home`).then((doc) => {
          const canvas = document.getElementById(`${doc.plotType}Bar`);
          canvas.style.position = 'relative';
          canvas.style.visibility = 'visible';
          document.getElementById('inputRect').appendChild(canvas);
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
      const canvas = document.getElementById('mfccBar');
      canvas.style.position = 'relative';
      canvas.style.visibility = 'visible';
      document.getElementById('inputRect').appendChild(canvas);
    },
  },
};
</script>

<style lang="css">
  .homeRect {
    border-radius: 35px;
    background:rgb(220, 220, 220);
    border-style: solid;
    border-width: 0.5vh 0.5vw;
    border-color: rgb(30, 30, 30);
  }
</style>
