<template>
  <section id="homeInSel">
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <v-ons-list-header id="inputSel">Input Selection
            <v-ons-button id="closeBtn" @click="$router.push('/statistic')">
                <i class="fa fa-times" id="closeIcon"></i>
            </v-ons-button>
        </v-ons-list-header>
        <v-ons-card id="dayRectSel" tappable @click="savePlotPosition(plots[0]);
        cbDay = !cbDay">
          <v-ons-list-item modifier="nodivider">
            <div class="left">
              <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
            </div>
            <div class="center">
              <span class="list-item__title">Day
                </span><span class="list-item__subtitle">Statistics of the day</span>
            </div>
            <div class="right">
              <v-ons-checkbox class="checkbox"
                v-model="cbDay">
              </v-ons-checkbox>
            </div>
          </v-ons-list-item>
        </v-ons-card>
        <v-ons-card id="weekRectSel" tappable @click="savePlotPosition(plots[1]);
        cbWeek = !cbWeek">
          <v-ons-list-item modifier="nodivider">
            <div class="left">
              <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
            </div>
            <div class="center">
              <span class="list-item__title">Week
                </span><span class="list-item__subtitle">Statistics of the week</span>
            </div>
            <div class="right">
              <v-ons-checkbox class="checkbox"
                v-model="cbWeek">
              </v-ons-checkbox>
            </div>
          </v-ons-list-item>
        </v-ons-card>
        <v-ons-card id="monthRectSel" tappable @click="savePlotPosition(plots[2]);
        cbMonth = !cbMonth">
          <v-ons-list-item modifier="nodivider">
            <div class="left">
              <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
            </div>
            <div class="center">
              <span class="list-item__title">Month
                </span><span class="list-item__subtitle">Statistics of the month</span>
            </div>
            <div class="right">
              <v-ons-checkbox class="checkbox"
                v-model="cbMonth">
              </v-ons-checkbox>
            </div>
          </v-ons-list-item>
        </v-ons-card>
        <v-ons-card id="yearRectSel" tappable @click="savePlotPosition(plots[3]);
        cbYear = !cbYear">
          <v-ons-list-item modifier="nodivider">
            <div class="left">
              <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
            </div>
            <div class="center">
              <span class="list-item__title">Year
                </span><span class="list-item__subtitle">Statistics of the year</span>
            </div>
            <div class="right">
              <v-ons-checkbox class="checkbox"
                v-model="cbYear">
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
      plots: ['day', 'week', 'month', 'year'],
      cbDay: false,
      cbWeek: false,
      cbMonth: false,
      cbYear: false,
    };
  },
  mounted() {
    Vue.prototype.stopDraw();
    this.loadSelPlot();
  },
  methods: {
    loadSelPlot() {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        for (let i = 0; i < this.plots.length; i += 1) {
          this.$pouch.get(`${this.plots[i]}Plot`, {}, `${user.username}statistic`).then((doc) => {
            switch (i) {
              case 0:
                this.cbDay = doc.visible;
                break;
              case 1:
                this.cbWeek = doc.visible;
                break;
              case 2:
                this.cbMonth = doc.visible;
                break;
              case 3:
                this.cbYear = doc.visible;
                break;
              default:
            }
          }).catch((err) => {
            console.error(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    savePlotPosition(plotType) {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get(`${plotType}Plot`, {}, `${user.username}statistic`).then((doc) => {
          doc.visible = !doc.visible;
          return this.$pouch.put(doc, {}, `${user.username}statistic`);
        }).catch(() => {
          const doc = {
            _id: `${plotType}Plot`,
            visible: true,
          };
          this.$pouch.put(doc, {}, `${user.username}statistic`).then(() => {
            console.log('plot saved');
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
    width: 25px;
    position: relative;
    float: right;
    background-color: red;
  }

  #closeIcon {
    position: relative;
    bottom: 6.5px;
    right: 3px;
  }

  .checkbox {
    position: relative;
    float: right;
    bottom: 0px;
  }
</style>
