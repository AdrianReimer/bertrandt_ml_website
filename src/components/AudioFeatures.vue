<template>
    <div id="audio-features">
        <div>
            <div id="buffer-bar">
                <div id="buffer_mover"> Raw audio </div>
                <div class="buffer-info" id="buffer-info">
                    <canvas id="buffer" width="1305" height="200"></canvas>
                </div>
            </div>
            <div id="mfcc-bar">
                <div id="mfcc_mover"> MFCC </div>
                <div class="mfcc-info" id="mfcc-info">
                    <canvas id="mfcc" width="1305" height="200"></canvas>
                </div>
            </div>
        <div id="prediction"></div>
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
    let element;
    let mouseX;
    let mouseY;

    function closeDragElement() {
      // stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function elementDrag() {
      const browserZoomLevel = window.devicePixelRatio * 1.79;
      const browserZoomLevel2 = window.devicePixelRatio * 2;
      const tmpScreenX = window.screen.height / browserZoomLevel;
      const tmpScreenY = window.screen.width / browserZoomLevel2;
      // calculate the new cursor position
      const pos1 = mouseX - window.event.clientX;
      const pos2 = mouseY - window.event.clientY;
      mouseX = window.event.clientX;
      mouseY = window.event.clientY;
      // set the element's new position
      element.style.top = `${Math.min(Math.max((element.offsetTop - pos2), 0), tmpScreenX)}px`;
      element.style.left = `${Math.min(Math.max((element.offsetLeft - pos1), 0), tmpScreenY)}px`;
    }

    function dragMouseDown() {
      // get the mouse cursor position at startup
      mouseX = window.event.clientX;
      mouseY = window.event.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }

    function dragElement(elmnt) {
      element = elmnt;
      if (document.getElementById(`${element.id}header`)) {
        // if present, the header is where you move the DIV from
        document.getElementById(`${element.id}header`).onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV
        element.onmousedown = dragMouseDown;
      }
    }

    // Make the DIV elements draggable
    dragElement(document.getElementById('mfcc-bar'));
  },
};
</script>

<style lang="css">
    #audio-features {
        display: flex;
        flex-direction: column;
        align-items: top;
        justify-content: top;
        font-size: calc(2vmin);
    }

    #buffer-bar {
        top: 0;
        position: absolute;
        overflow: hidden;
        font-size: calc(2vmin);
        height: 23vmin;
        width: 50%;
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
        height: 23vmin;
        width: 100%;
        padding-bottom: 0.5vmin;
    }

    #mfcc-bar {
        top: 0;
        position: absolute;
        overflow: hidden;
        font-size: calc(2vmin);
        height: 23vmin;
        width: 50%;
        background-color: rgb(40, 40, 40);
        color: whitesmoke;
    }

    #mfcc_mover {
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mfcc-info {
        background-color: rgb(200, 200, 200);
        display: flex;
        height: 23vmin;
        width: 100%;
        padding-bottom: 0.5vmin;
    }
</style>
