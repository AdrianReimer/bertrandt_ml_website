<template>
    <section id="trigger">
      <TheAudio />
      <v-ons-page style="height:90vh;">
        <v-ons-list>
          <v-ons-list-header style="font-size: 4vmin">Sound</v-ons-list-header>
          <v-ons-list-item v-for="(triggerSound, $index) in triggerSounds"
          v-bind:key="triggerSound" tappable>
            <label class="left">
              <v-ons-checkbox
                :input-id="'checkbox-1' + $index"
                :value="triggerSound"
                v-model="checkedTriggerSounds"
                @change="saveTriggerSound($index)">
              </v-ons-checkbox>
            </label>
            <label class="center" :for="'checkbox-1' + $index">
              {{ triggerSound }}
            </label>
            <div class="right">
              <v-ons-button :for="'playBtn-' + $index" @click="playTriggerSound($index + 1)">
                <i class="fa fa-play fa-fw "></i>
              </v-ons-button>
            </div>
          </v-ons-list-item>
          <v-ons-list-header style="font-size: 4vmin">Settings</v-ons-list-header>
            <v-ons-list>
              <v-ons-list-item>
                Adjust the volume:
                <v-ons-row>
                  <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
                    <v-ons-icon icon="md-volume-down"></v-ons-icon>
                  </v-ons-col>
                  <v-ons-col>
                    <v-ons-range
                      style="width: 100%;"
                      v-model="triggerSoundVolume"
                      @change="saveTriggerSoundVolume">
                    </v-ons-range>
                  </v-ons-col>
                  <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
                    <v-ons-icon icon="md-volume-up"></v-ons-icon>
                  </v-ons-col>
                </v-ons-row>
                  Volume: {{ triggerSoundVolume }} <span v-show="Number(triggerSoundVolume) > 80">
                  &nbsp;(careful, that's loud)</span>
              </v-ons-list-item>
            </v-ons-list>
        </v-ons-list>
      </v-ons-page>
    </section>
</template>

<script>
import Vue from 'vue';
import TheAudio from '../components/TheAudio.vue';

export default {
  components: {
    TheAudio,
  },
  data() {
    return {
      triggerSounds: ['Trigger1', 'Trigger2', 'Trigger3'],
      checkedTriggerSounds: [],
      triggerLabels: ['Angry', 'Disgusted', 'Scared', 'Happy', 'Neutral', 'Sad', 'Surprised'],
      triggerSoundVolume: 50,
    };
  },
  mounted() {
    try {
      Vue.prototype.stopDraw();
    } catch {
      console.log('stopDraw function not defined');
    }
    this.loadData();
  },
  methods: {
    loadData() {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        // load trigger sound
        for (let i = 0; i < this.triggerSounds.length; i += 1) {
          this.$pouch.get(`trigger${i}`, {}, `${user.name}trigger`).then((doc) => {
            if (doc.state) {
              this.checkedTriggerSounds.push(`Trigger${i + 1}`);
              console.log(this.checkedTriggerSounds);
            }
          }).catch((err) => {
            console.log(err);
          });
        }
        // load trigger sound volume
        this.$pouch.get('triggerSoundVolume', {}, `${user.name}trigger`).then((doc) => {
          this.triggerSoundVolume = doc.value;
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    saveTriggerSound(triggerNum) {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        // save trigger state
        this.$pouch.get(`trigger${triggerNum}`, {}, `${user.name}trigger`).then((doc) => {
          doc.state = !doc.state;
          if (doc.state) {
            this.$router.push('/trigger/selection');
          }
          return this.$pouch.put(doc, {}, `${user.name}trigger`);
        }).catch(() => {
          const doc = {
            _id: `trigger${triggerNum}`,
            state: true,
          };
          this.$pouch.put(doc, {}, `${user.name}trigger`).then(() => {
            console.log('Trigger sound saved');
          }).catch((err) => {
            console.error(err);
          });
        }).catch((err) => {
          console.log(err);
        });
        // save changeable trigger
        this.$pouch.get('triggerCur', {}, `${user.name}trigger`).then((doc) => {
          doc.value = triggerNum;
          return this.$pouch.put(doc, {}, `${user.name}trigger`);
        }).catch(() => {
          const doc = {
            _id: 'triggerCur',
            value: triggerNum,
          };
          this.$pouch.put(doc, {}, `${user.name}trigger`).then(() => {
            this.$router.push('/trigger/selection');
            console.log('Trigger sound saved');
          }).catch((err) => {
            console.error(err);
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    saveTriggerSoundVolume() {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('triggerSoundVolume', {}, `${user.name}trigger`).then((doc) => {
          doc.value = this.triggerSoundVolume;
          return this.$pouch.put(doc, {}, `${user.name}trigger`);
        }).catch(() => {
          const doc = {
            _id: 'triggerSoundVolume',
            value: this.triggerSoundVolume,
          };
          this.$pouch.put(doc, {}, `${user.name}trigger`).then(() => {
            console.log('Trigger sound volume saved');
          }).catch((err) => {
            console.error(err);
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    playTriggerSound(btnIdx) {
      document.getElementById(`Trigger${btnIdx}`).volume = this.triggerSoundVolume / 100;
      const audio = document.getElementById(`Trigger${btnIdx}`);
      audio.play();
    },

  },
};
</script>
