<template>
    <div id="statFeatures">
        <div>
            <div id="statDayBar">
                <div id="statDayMover"> Day </div>
                <div id="statDayInfo">
                    <canvas id="statDay" width="1305" height="200"></canvas>
                </div>
            </div>
            <div id="statWeekBar">
                <div id="statWeekMover"> Week </div>
                <div id="statWeekInfo">
                    <canvas id="statWeek" width="1305" height="200"></canvas>
                </div>
            </div>
            <div id="statMonthBar">
                <div id="statMonthMover"> Month </div>
                <div id="statMonthInfo">
                    <canvas id="statMonth" width="1305" height="200"></canvas>
                </div>
            </div>
            <div id="statYearBar">
                <div id="statYearMover"> Year </div>
                <div id="statYearInfo">
                    <canvas id="statYear" width="1305" height="200"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css">
    #statFeatures {
        display: flex;
        flex-direction: column;
        align-items: top;
        justify-content: top;
        font-size: calc(2vmin);
    }

    #statDayBar {
        visibility: hidden;
        top: 0;
        position: absolute;
        overflow: hidden;
        font-size: calc(2vmin);
        margin-top: 0.5vh;
        margin-left: 0.5vw;
        height: 29vh;
        width: 99vw;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #statDayMover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #statDayInfo {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 27vh;
        width: 99vw;
        padding-bottom: 0.5vmin;
    }

    #statDay {
        position: fixed;
        width: 99vw;
        height: 27vh;
    }

    #statWeekBar {
        visibility: hidden;
        top: 0;
        position: flex;
        overflow: hidden;
        font-size: calc(2vmin);
        margin-top: 0.5vh;
        margin-left: 0.5vw;
        height: 29vh;
        width: 99vw;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #statWeekMover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #statWeek {
        width: 99vw;
        height: 27vh;
    }

    #statWeekInfo {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 27vh;
        width: 99vw;
        padding-bottom: 0.5vmin;
    }

    #statMonthBar {
        visibility: hidden;
        top: 0;
        position: absolute;
        overflow: hidden;
        font-size: calc(2vmin);
        margin-top: 0.5vh;
        margin-left: 0.5vw;
        height: 29vh;
        width: 99vw;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #statMonthMover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #statMonthInfo {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 27vh;
        width: 99vw;
        padding-bottom: 0.5vmin;
    }

    #statMonth {
        position: fixed;
        width: 99vw;
        height: 27vh;
    }

    #statYearBar {
        visibility: hidden;
        top: 0;
        position: flex;
        overflow: hidden;
        font-size: calc(2vmin);
        margin-top: 0.5vh;
        margin-left: 0.5vw;
        height: 29vh;
        width: 99vw;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #statYearMover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #statYear {
        width: 99vw;
        height: 27vh;
    }

    #statYearInfo {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 27vh;
        width: 99vw;
        padding-bottom: 0.5vmin;
    }
</style>
