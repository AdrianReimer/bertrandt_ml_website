<template>
    <section id="statistic">
      <div class="statRect" id="statRect1"></div>
      <button @click="curRect = 0; alertDialogVisible = true" class="statBtn" id="statBtn1">
      <i class="fa fa-plus-circle"></i></button>
      <div class="statRect" id="statRect2"></div>
      <button @click="curRect = 1; alertDialogVisible = true" class="statBtn" id="statBtn2">
      <i class="fa fa-plus-circle"></i></button>
      <div class="statRect" id="statRect3"></div>
      <button @click="curRect = 2; alertDialogVisible = true" class="statBtn" id="statBtn3">
      <i class="fa fa-plus-circle"></i></button>

      <v-ons-alert-dialog modifier="rowfooter"
      :visible.sync="alertDialogVisible"
      style="width: 100vw;">
      Please select a chart type
      <template slot="footer">
        <ons-list-item tappable @click="addPlot(plots[0])">
          {{plots[0]}}
        </ons-list-item>
        <ons-list-item tappable @click="addPlot(plots[1])">
          {{plots[1]}}
        </ons-list-item>
        <ons-list-item tappable @click="addPlot(plots[2])">
          {{plots[2]}}
        </ons-list-item>
        <ons-list-item tappable @click="addPlot(plots[3])">
          {{plots[3]}}
        </ons-list-item>
        <ons-list-item tappable style="color: red" @click="alertDialogVisible = false">
          Cancel
        </ons-list-item>
      </template>
      </v-ons-alert-dialog>
      <StatisticFeatures />
    </section>
</template>

<script>
import Chart from 'chart.js';
import StatisticFeatures from '../components/StatisticFeatures.vue';

export default {
  components: {
    StatisticFeatures,
  },
  data() {
    return {
      plots: ['Day', 'Week', 'Month', 'Year'],
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
      for (let i = 0; i < this.labels.length; i += 1) {
        // load day data
        this.$pouch.get(`${day}${this.labels[i]}`, {}, `${this.$user}home`).then((doc) => {
          this.dayData[i] = doc.value;
        }).catch((err) => {
          console.log(err);
        });
        // load week data
        this.$pouch.get(`${week}${this.labels[i]}`, {}, `${this.$user}home`).then((doc) => {
          this.dayData[i] = doc.value;
        }).catch((err) => {
          console.log(err);
        });
        // load month data
        this.$pouch.get(`${month}${this.labels[i]}`, {}, `${this.$user}home`).then((doc) => {
          this.dayData[i] = doc.value;
        }).catch((err) => {
          console.log(err);
        });
        // load year data
        this.$pouch.get(`${year}${this.labels[i]}`, {}, `${this.$user}home`).then((doc) => {
          this.dayData[i] = doc.value;
        }).catch((err) => {
          console.log(err);
        });
      }
    },

    savePlotPosition(posY, plotType) {
      this.$pouch.get(plotType, {}, `${this.$user}statistic`).then((doc) => {
        doc.y = posY;
        return this.$pouch.put(doc, {}, `${this.$user}statistic`);
      }).catch(() => {
        const doc = {
          _id: plotType,
          y: posY,
        };
        this.$pouch.put(doc, {}, `${this.$user}statistic`).then(() => {
          console.log('plot position saved');
        }).catch((err) => {
          console.error(err);
        });
      });
    },

    addPlot(plotType) {
      for (let i = 0; i < this.plots.length; i += 1) {
        if (plotType === this.plots[i]) {
          const canvas = document.getElementById(`stat${this.plots[i]}Bar`);
          const top = parseInt(this.curRect, 10) * 30;
          canvas.style.position = 'absolute';
          canvas.style.top = `${top}vh`;
          canvas.style.visibility = 'visible';
          this.savePlotPosition(top, this.plots[i]);
        }
      }
      this.alertDialogVisible = false;
    },
  },
  mounted() {
    this.loadData();
    // load plot positions
    for (let i = 0; i < this.plots.length; i += 1) {
      this.$pouch.get(this.plots[i], {}, `${this.$user}statistic`).then((doc) => {
        const canvas = document.getElementById(`stat${this.plots[i]}Bar`);
        canvas.style.position = 'absolute';
        canvas.style.top = `${doc.y}vh`;
        canvas.style.left = 0;
        canvas.style.visibility = 'visible';
      }).catch((err) => {
        console.log(err);
      });
    }
    // create day chart
    let dayChart = document.getElementById('statDay').getContext('2d');
    dayChart = new Chart(dayChart, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: false,
          data: this.dayData,
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
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
    });
    // create week chart
    let weekChart = document.getElementById('statWeek').getContext('2d');
    weekChart = new Chart(weekChart, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: false,
          data: this.weekData,
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
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
    });
    // create month chart
    let monthChart = document.getElementById('statMonth').getContext('2d');
    monthChart = new Chart(monthChart, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: false,
          data: this.monthData,
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
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
    });
    // create year chart
    let yearChart = document.getElementById('statYear').getContext('2d');
    yearChart = new Chart(yearChart, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: false,
          data: this.yearData,
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
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
    });
    console.log(dayChart);
    console.log(weekChart);
    console.log(monthChart);
    console.log(yearChart);
  },
};
</script>

<style lang="css">
  .chart-container {
      width: 100vw;
      height: 78vh;
  }

  .statBtn {
    position: absolute;
    background: transparent;
    border: hidden;
    outline: none;
    padding: 0;
    font-size: 6vmin;
  }

  .statBtn:hover {
    transition-duration: 0.3s;
    filter: opacity(50%);
    -webkit-filter: opacity(50%);
  }

  #statBtn1 {
    position: absolute;
    margin-top: 11.5vh;
    margin-left: 48vw;
  }

  #statBtn2 {
    margin-top: 41.5vh;
    margin-left: 48vw;
  }

  #statBtn3 {
    margin-top: 72.5vh;
    margin-left: 48vw;
  }

  .statRect {
    position: absolute;
    width: 99vw;
    height: 29vh;
    background:rgb(220, 220, 220);
    border-style: solid;
    border-width: 0.5vh 0.5vw;
    border-color: rgb(30, 30, 30);
  }

  #statRect1 {
    margin-top: 0vh;
    margin-left: 0vw;
  }

  #statRect2 {
    margin-top: 30vh;
    margin-left: 0vw;
  }

  #statRect3 {
    margin-top: 60vh;
    margin-left: 0vw;
  }
</style>
