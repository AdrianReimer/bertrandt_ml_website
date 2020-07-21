<template>
    <section id="statistic">
        <div class="chart-container">
            <canvas id="chart1" width="1305" height="500"></canvas>
        </div>
    </section>
</template>

<script>
import Chart from 'chart.js';

export default {
  mounted() {
    let myChart = document.getElementById('chart1').getContext('2d');
    console.log(myChart);
    myChart = new Chart(myChart, {
      type: 'bar',
      data: {
        labels: [
          'Angry',
          'Disgusted',
          'Scared',
          'Happy',
          'Neutral',
          'Sad',
          'Surprised',
          'Calm'],
        datasets: [{
          label: false,
          data: [
            25,
            23,
            20,
            17,
            15,
            13,
            12,
            4,
          ],
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
          display: true,
          text: 'Today\'s emotions',
        },
        legend: {
          display: false,
        },
      },
    });
  },
};
</script>

<style lang="css">
    .chart-container {
        width: 100vw;
        height: 78vh;
    }
</style>
