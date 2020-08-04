<template>
    <div id="audioFeatures">
        <div>
            <div id="bufferBar">
                <div id="buffer_mover"> Raw audio </div>
                <div class="buffer-info" id="buffer-info">
                    <canvas id="buffer" width="1305" height="200"></canvas>
                </div>
            </div>
            <div id="mfccBar">
                <div id="mfcc_mover"> MFCC </div>
                <div class="mfcc-info" id="mfcc-info">
                    <canvas id="mfcc" width="1305" height="200"></canvas>
                </div>
            </div>
        <div id="prediction"></div>
        </div>
    </div>
</template>

<style lang="css">
    #audioFeatures {
        display: flex;
        flex-direction: column;
        align-items: top;
        justify-content: top;
        font-size: calc(2vmin);
    }

    #bufferBar {
        visibility: hidden;
        top: 0;
        position: absolute;
        overflow: hidden;
        font-size: calc(2vmin);
        margin-top: 0.5vh;
        margin-left: 0.5vw;
        height: 29vh;
        width: 49vw;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #buffer_mover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .buffer-info {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 29vh;
        width: 49vw;
        padding-bottom: 0.5vmin;
    }

    #buffer {
        position: fixed;
        width: 49vw;
        height: 25vh;
    }

    #mfccBar {
        visibility: hidden;
        top: 0;
        position: flex;
        overflow: hidden;
        font-size: calc(2vmin);
        margin-top: 0.5vh;
        margin-left: 0.5vw;
        height: 29vh;
        width: 49vw;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #mfcc_mover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #mfcc {
        width: 49vw;
        height: 27vh;
    }

    .mfcc-info {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 29vh;
        width: 49vw;
        padding-bottom: 0.5vmin;
    }
</style>
