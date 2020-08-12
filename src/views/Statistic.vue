<template>
  <section id="statistic">
  <v-ons-page style="height:90vh;">
    <v-ons-list>
      <v-ons-card id="statRect" tappable @click="$router.push('/statistic/selection')">
      </v-ons-card>
    </v-ons-list>
  </v-ons-page>
  <StatisticFeatures />
  </section>
</template>

<script>
import Vue from 'vue';
import Chart from 'chart.js';
import StatisticFeatures from '../components/StatisticFeatures.vue';

export default {
  components: {
    StatisticFeatures,
  },
  data() {
    return {
      plots: ['day', 'week', 'month', 'year'],
      alertDialogVisible: false,
      curRect: 0,
      labels: ['Angry', 'Disgusted', 'Scared', 'Happy', 'Neutral', 'Sad', 'Surprised', 'Calm'],
      dayData: [0, 0, 0, 0, 0, 0, 0, 0],
      weekData: [0, 0, 0, 0, 0, 0, 0, 0],
      monthData: [0, 0, 0, 0, 0, 0, 0, 0],
      yearData: [0, 0, 0, 0, 0, 0, 0, 0],
    };
  },
  methods: {
    loadData() {
      // get current Day
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const day = `${dd}${mm}${year}`;
      const week = `${parseInt((dd / 7) + (mm * 4), 10)}${year}`;
      const month = `${mm}${year}`;
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        for (let i = 0; i < this.labels.length; i += 1) {
          // load day data
          this.$pouch.get(`${day}${this.labels[i]}`, {}, `${user.name}home`).then((doc) => {
            this.dayData[i] = doc.value;
          }).catch((err) => {
            console.log(err);
          });
          // load week data
          this.$pouch.get(`${week}${this.labels[i]}`, {}, `${user.name}home`).then((doc) => {
            this.weekData[i] = doc.value;
          }).catch((err) => {
            console.log(err);
          });
          // load month data
          this.$pouch.get(`${month}${this.labels[i]}`, {}, `${user.name}home`).then((doc) => {
            this.monthData[i] = doc.value;
          }).catch((err) => {
            console.log(err);
          });
          // load year data
          this.$pouch.get(`${year}${this.labels[i]}`, {}, `${user.name}home`).then((doc) => {
            this.yearData[i] = doc.value;
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    createPlot(plotType, data) {
      let chart = document.getElementById(`stat${plotType}`).getContext('2d');
      console.log(chart);
      chart = new Chart(chart, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            label: false,
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 2,
            hoverBorderColor: '#555',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          title: {
            fontSize: 22,
            text: plotType,
            display: true,
          },
          legend: {
            display: false,
          },
        },
      });
    },
  },
  mounted() {
    try {
      Vue.prototype.stopDraw();
    } catch {
      console.log('stopDraw function not defined');
    }
    this.loadData();
    this.createPlot(this.plots[0], this.dayData);
    this.createPlot(this.plots[1], this.weekData);
    this.createPlot(this.plots[2], this.monthData);
    this.createPlot(this.plots[3], this.yearData);
    // load plot positions
    for (let i = 0; i < this.plots.length; i += 1) {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get(`${this.plots[i]}Plot`, {}, `${user.name}statistic`).then((doc) => {
          if (doc.visible) {
            const canvas = document.getElementById(`stat${this.plots[i]}`);
            canvas.style.position = 'relative';
            canvas.style.visibility = 'visible';
            document.getElementById('statRect').appendChild(canvas);
          }
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  },
};
</script>

<style lang="css">
  .chart-container {
      width: 100vw;
      height: 78vh;
  }
</style>
