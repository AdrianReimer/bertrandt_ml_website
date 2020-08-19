<template>
  <section id="homeSel">
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <v-ons-list-header style="font-size: 4vmin; padding-bottom: 3vh">Input Selection
            <v-ons-button id="closeBtn" @click="$router.push('/')">
                <i class="fa fa-times" id="closeIcon"></i>
            </v-ons-button>
        </v-ons-list-header>
        <v-ons-card id="bufferRectSel" tappable @click="savePlotPosition(plots[0]);
        cbBuffer = !cbBuffer">
          <v-ons-list-item modifier="nodivider">
            <div class="left">
              <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
            </div>
            <div class="center">
              <span class="list-item__title">Buffer
                </span>
                <span class="list-item__subtitle">
                  This is the raw audio that you get when reading an input from
                  a microphone, a wav file, or any other input audio.
                </span>
            </div>
            <div class="right">
              <v-ons-checkbox class="checkbox"
                v-model="cbBuffer">
              </v-ons-checkbox>
            </div>
          </v-ons-list-item>
        </v-ons-card>
        <v-ons-card id="mfccRectSel" tappable @click="savePlotPosition(plots[1]);
        cbMfcc = !cbMfcc">
          <v-ons-list-item modifier="nodivider">
            <div class="left">
              <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
            </div>
            <div class="center">
              <span class="list-item__title">Mel-frequency cepstral coefficients
                </span>
                <span class="list-item__subtitle">
                  As humans don’t interpret pitch in a linear manner, various scales of
                  frequencies were devised to represent the way humans hear the distances
                  between pitches. The Mel scale is one of them, and it is now widely used
                  for voice-related applications.
                </span>
            </div>
            <div class="right">
              <v-ons-checkbox class="checkbox"
                v-model="cbMfcc">
              </v-ons-checkbox>
            </div>
          </v-ons-list-item>
        </v-ons-card>
      </v-ons-list>
    </v-ons-page>
  </section>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      plots: ['buffer', 'mfcc'],
      cbBuffer: false,
      cbMfcc: false,
    };
  },
  mounted() {
    Vue.prototype.stopDraw();
    this.loadSelPlot();
  },
  methods: {
    loadSelPlot() {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('plot', {}, `${user.name}home`).then((doc) => {
          for (let i = 0; i < this.plots.length; i += 1) {
            if (doc.plotType === this.plots[i]) {
              switch (i) {
                case 0:
                  this.cbBuffer = true;
                  break;
                case 1:
                  this.cbMfcc = true;
                  break;
                default:
              }
            }
          }
        }).catch((err) => {
          console.error(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    savePlotPosition(plotType) {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('plot', {}, `${user.name}home`).then((doc) => {
          doc.plotType = plotType;
          this.$router.push('/');
          return this.$pouch.put(doc, {}, `${user.name}home`);
        }).catch(() => {
          const doc = {
            _id: 'plot',
            plotType,
          };
          this.$pouch.put(doc, {}, `${user.name}home`).then(() => {
            console.log('plot position saved');
            this.$router.push('/');
          }).catch((err) => {
            console.error(err);
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="css">
  #closeBtn {
    height: 25px;
    width: 35px;
    position: relative;
    float: right;
    background-color: red;
  }

  #closeIcon {
    position: relative;
    bottom: -3px;
    right: 8px;
    font-size: 7vmin;
  }
</style>
