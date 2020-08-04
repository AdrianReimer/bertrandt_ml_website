<template>
  <section id="home">
    <div class="homeRect" id="homeRect1"></div>
    <button @click="curRect = 0; alertDialogVisible = true" class="homeBtn" id="homeBtn1">
    <i class="fa fa-plus-circle"></i></button>
    <div class="homeRect" id="homeRect2"></div>
    <button @click="curRect = 1; alertDialogVisible = true" class="homeBtn" id="homeBtn2">
    <i class="fa fa-plus-circle"></i></button>
    <div class="homeRect" id="homeRect3"></div>
    <button @click="curRect = 2; alertDialogVisible = true" class="homeBtn" id="homeBtn3">
    <i class="fa fa-plus-circle"></i></button>
    <div class="homeRect" id="homeRect4"></div>
    <button @click="curRect = 3; alertDialogVisible = true" class="homeBtn" id="homeBtn4">
    <i class="fa fa-plus-circle"></i></button>
    <div class="homeRect" id="homeRect5"></div>
    <button @click="curRect = 4; alertDialogVisible = true" class="homeBtn" id="homeBtn5">
    <i class="fa fa-plus-circle"></i></button>
    <div class="homeRect" id="homeRect6"></div>
    <button @click="curRect = 5; alertDialogVisible = true" class="homeBtn" id="homeBtn6">
    <i class="fa fa-plus-circle"></i></button>

    <v-ons-alert-dialog modifier="rowfooter" :visible.sync="alertDialogVisible">
    Please select a diagram type
    <template slot="footer">
      <ons-list-item tappable @click="addPlot(plots[0])">
        {{ plots[0].charAt(0).toUpperCase() + plots[0].slice(1) }}
      </ons-list-item>
      <ons-list-item tappable @click="addPlot(plots[1])">
        {{ plots[1].toUpperCase() }}
      </ons-list-item>
      <ons-list-item tappable style="color: red" @click="alertDialogVisible = false">
        Cancel
      </ons-list-item>
    </template>
    </v-ons-alert-dialog>
  <AudioFeatures />
  </section>
</template>

<script>
import AudioFeatures from '../components/AudioFeatures.vue';
import 'meyda';
import 'p5';

export default {
  components: {
    AudioFeatures,
  },
  data() {
    return {
      plots: ['buffer', 'mfcc'],
      alertDialogVisible: false,
      curRect: 0,
    };
  },
  mounted() {
    // load plots
    for (let i = 0; i < this.plots.length; i += 1) {
      this.$pouch.get(this.plots[i], {}, `${this.$user}home`).then((doc) => {
        const canvas = document.getElementById(`${this.plots[i]}Bar`);
        canvas.style.position = 'absolute';
        canvas.style.top = `${doc.y}vh`;
        canvas.style.left = `${doc.x}vw`;
        canvas.style.visibility = 'visible';
      }).catch((err) => {
        console.error(err);
      });
    }
  },
  methods: {
    savePlotPosition(posX, posY, plotType) {
      this.$pouch.get(plotType, {}, `${this.$user}home`).then((doc) => {
        doc.x = posX;
        doc.y = posY;
        return this.$pouch.put(doc, {}, `${this.$user}home`);
      }).catch(() => {
        const doc = {
          _id: plotType,
          x: posX,
          y: posY,
        };
        this.$pouch.put(doc, {}, `${this.$user}home`).then(() => {
          console.log('plot position saved');
        }).catch((err) => {
          console.error(err);
        });
      });
    },
    addPlot(plotType) {
      for (let i = 0; i < this.plots.length; i += 1) {
        if (plotType === this.plots[i]) {
          const canvas = document.getElementById(`${this.plots[i]}Bar`);
          const left = (this.curRect % 2) * 50;
          const top = parseInt(this.curRect / 2, 10) * 30;
          canvas.style.position = 'absolute';
          canvas.style.top = `${top}vh`;
          canvas.style.left = `${left}vw`;
          canvas.style.visibility = 'visible';
          this.savePlotPosition(left, top, this.plots[i]);
        }
      }
      this.alertDialogVisible = false;
    },
  },
};
</script>

<style lang="css">
  .homeBtn {
    position: absolute;
    background: transparent;
    border: hidden;
    outline: none;
    padding: 0;
    font-size: 6vmin;
  }

  .homeBtn:hover {
    transition-duration: 0.3s;
    filter: opacity(50%);
    -webkit-filter: opacity(50%);
  }

  #homeBtn1 {
    position: absolute;
    margin-top: 11.5vh;
    margin-left: 23vw;
  }

  #homeBtn2 {
    margin-top: 11.5vh;
    margin-left: 74vw;
  }

  #homeBtn3 {
    margin-top: 41.5vh;
    margin-left: 23vw;
  }

  #homeBtn4 {
    margin-top: 41.5vh;
    margin-left: 74vw;
  }

  #homeBtn5 {
    margin-top: 71.5vh;
    margin-left: 23vw;
  }

  #homeBtn6 {
    margin-top: 71.5vh;
    margin-left: 74vw;
  }

  .homeRect {
    position: absolute;
    width: 49vw;
    height: 29vh;
    background:rgb(220, 220, 220);
    border-style: solid;
    border-width: 0.5vh 0.5vw;
    border-color: rgb(30, 30, 30);
  }

  #homeRect1 {
    margin-top: 0vh;
    margin-left: 0vw;
  }

  #homeRect2 {
    margin-top: 0vh;
    margin-left: 50vw;
  }

  #homeRect3 {
    margin-top: 30vh;
    margin-left: 0vw;
  }

  #homeRect4 {
    margin-top: 30vh;
    margin-left: 50vw;
  }

  #homeRect5 {
    margin-top: 60vh;
    margin-left: 0vw;
  }

  #homeRect6 {
    margin-top: 60vh;
    margin-left: 50vw;
  }
</style>
