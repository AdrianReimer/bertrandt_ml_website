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
        border-radius: 10px;
        position: flex;
        overflow: hidden;
        font-size: 3vmin;
        height: 30vh;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #buffer_mover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3vh;
    }

    .buffer-info {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 30vh;
    }

    #buffer {
        height: 30vh;
        width: 100vw;
    }

    #mfccBar {
        border-radius: 10px;
        visibility: hidden;
        position: flex;
        overflow: hidden;
        font-size: 3vmin;
        height: 30vh;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #mfcc_mover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3vh;
    }

    #mfcc {
        height: 30vh;
        width: 100vw;
    }

    .mfcc-info {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 30vh;
    }
</style>
