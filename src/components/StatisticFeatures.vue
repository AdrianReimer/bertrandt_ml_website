<template>
    <div>
        <div class="chart-container">
            <canvas class="statCanv" id="statday"></canvas>
        </div>
        <div class="chart-container">
            <canvas class="statCanv" id="statweek"></canvas>
        </div>
        <div class="chart-container">
            <canvas class="statCanv" id="statmonth"></canvas>
        </div>
        <div class="chart-container">
            <canvas id="statyear"></canvas>
        </div>
    </div>
</template>

<style lang="css">
    .chart-container {
        overflow: hidden;
        size: fixed;
        position: relative;
        width: 100vw;
        height: 30vh;
    }

    .statCanv {
        padding-bottom: 8vh;
    }
</style>
