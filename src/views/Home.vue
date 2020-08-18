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
          <v-ons-progress-circular v-show="modelIsPredicting" indeterminate>
          </v-ons-progress-circular>
          <div v-show="!modelIsPredicting" id="prediction"></div>
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
    this.loadTut();
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
  #prediction {
    font-size: 8vmin;
  }
</style>
