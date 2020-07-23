<template>
    <section id="trigger">
      <TheAudio />
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">Triggers</div>
        </v-ons-toolbar>
        <ons-list>
          <v-ons-list-header>Sound</v-ons-list-header>
          <v-ons-list-item v-for="(triggerSound, $index) in triggerSounds"
           v-bind:key="triggerSound" tappable>
            <label class="left">
              <v-ons-radio
                :input-id="'radio-1' + $index"
                :value="triggerSound"
                v-model="selectedTriggerSound"
                @change="saveTriggerSound">
              </v-ons-radio>
            </label>
            <label :for="'radio-1' + $index" class="center">
              {{ triggerSound }}
            </label>
          </v-ons-list-item>
          <v-ons-list-header>Label</v-ons-list-header>
            <v-ons-list-item v-for="(triggerLabel, $index) in triggerLabels"
            v-bind:key="triggerLabel" tappable>
              <label class="left">
                <v-ons-radio
                  :input-id="'radio-2' + $index"
                  :value="triggerLabel"
                  v-model="selectedTriggerLabel"
                  @change="saveTriggerLabel">
                </v-ons-radio>
              </label>
              <label :for="'radio-2' + $index" class="center">
                {{ triggerLabel }}
              </label>
            </v-ons-list-item>
          <v-ons-list-header>Settings</v-ons-list-header>
            <ons-list-item>
              <label class="center" for="switch1">
                Switch ({{ triggerSoundSwitchOn ? 'on' : 'off' }})
              </label>
              <div class="right">
                <v-ons-switch input-id="switch1" v-model="triggerSoundSwitchOn"
                 @change="saveTriggerSoundSwitch">
                </v-ons-switch>
              </div>
            </ons-list-item>
            <v-ons-list>
              <v-ons-list-item>
                Adjust the volume:
                <v-ons-row>
                  <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
                    <v-ons-icon icon="md-volume-down"></v-ons-icon>
                  </v-ons-col>
                  <v-ons-col>
                    <v-ons-range v-model="triggerSoundVolume" style="width: 100%;"
                    @change="saveTriggerSoundVolume"></v-ons-range>
                  </v-ons-col>
                  <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
                    <v-ons-icon icon="md-volume-up"></v-ons-icon>
                  </v-ons-col>
                </v-ons-row>
                Volume: {{ triggerSoundVolume }} <span v-show="Number(triggerSoundVolume) > 80">
                  &nbsp;(careful, that's loud)</span>
              </v-ons-list-item>
            </v-ons-list>
        </ons-list>
      </v-ons-page>
    </section>
</template>

<script>
import TheAudio from '../components/TheAudio.vue';

export default {
  components: {
    TheAudio,
  },
  data() {
    return {
      triggerSounds: ['Trigger1', 'Trigger2', 'Trigger3'],
      triggerLabels: ['Angry', 'Disgusted', 'Scared', 'Happy', 'Neutral', 'Sad', 'Surprised'],
      selectedTriggerSound: 'Trigger1',
      selectedTriggerLabel: 'Disgusted',
      triggerSoundSwitchOn: true,
      triggerSoundVolume: 50,
    };
  },
  mounted() {
    // load trigger sound
    this.$pouch.get('selectedTriggerSound', {}, 'trigger').then((doc) => {
      this.selectedTriggerSound = doc.value;
    }).catch((err) => {
      console.error(err);
    });
    // load label sound
    this.$pouch.get('selectedTriggerLabel', {}, 'trigger').then((doc) => {
      this.selectedTriggerLabel = doc.value;
    }).catch((err) => {
      console.error(err);
    });
    // load trigger button
    this.$pouch.get('triggerSoundSwitchOn', {}, 'trigger').then((doc) => {
      this.triggerSoundSwitchOn = doc.value;
    }).catch((err) => {
      console.error(err);
    });
    // load trigger sound volume
    this.$pouch.get('triggerSoundVolume', {}, 'trigger').then((doc) => {
      this.triggerSoundVolume = doc.value;
      document.getElementById(this.selectedTriggerSound).volume = doc.value / 100;
    }).catch((err) => {
      console.error(err);
    });
  },
  methods: {
    saveTriggerSound() {
      this.$pouch.get('selectedTriggerSound', {}, 'trigger').then((doc) => {
        doc.value = this.selectedTriggerSound;
        this.playTriggerSound();
        return this.$pouch.put(doc, {}, 'trigger');
      }).catch(() => {
        const doc = {
          _id: 'selectedTriggerSound',
          value: this.selectedTriggerSound,
        };
        this.$pouch.put(doc, {}, 'trigger').then(() => {
          console.log('Trigger sound saved');
        }).catch((err) => {
          console.error(err);
        });
      });
    },
    saveTriggerLabel() {
      this.$pouch.get('selectedTriggerLabel', {}, 'trigger').then((doc) => {
        doc.value = this.selectedTriggerLabel;
        return this.$pouch.put(doc, {}, 'trigger');
      }).catch(() => {
        const doc = {
          _id: 'selectedTriggerLabel',
          value: this.selectedTriggerLabel,
        };
        this.$pouch.put(doc, {}, 'trigger').then(() => {
          console.log('Trigger label saved');
        }).catch((err) => {
          console.error(err);
        });
      });
    },
    saveTriggerSoundSwitch() {
      this.$pouch.get('triggerSoundSwitchOn', {}, 'trigger').then((doc) => {
        doc.value = this.triggerSoundSwitchOn;
        return this.$pouch.put(doc, {}, 'trigger');
      }).catch(() => {
        const doc = {
          _id: 'triggerSoundSwitchOn',
          value: this.triggerSoundSwitchOn,
        };
        this.$pouch.put(doc, {}, 'trigger').then(() => {
          console.log('Trigger sound switch saved');
        }).catch((err) => {
          console.error(err);
        });
      });
    },
    saveTriggerSoundVolume() {
      this.$pouch.get('triggerSoundVolume', {}, 'trigger').then((doc) => {
        doc.value = this.triggerSoundVolume;
        return this.$pouch.put(doc, {}, 'trigger');
      }).catch(() => {
        const doc = {
          _id: 'triggerSoundVolume',
          value: this.triggerSoundVolume,
        };
        this.$pouch.put(doc, {}, 'trigger').then(() => {
          console.log('Trigger sound volume saved');
        }).catch((err) => {
          console.error(err);
        });
      });
      document.getElementById(this.selectedTriggerSound).volume = this.triggerSoundVolume / 100;
    },
    playTriggerSound() {
      document.getElementById(this.selectedTriggerSound).volume = this.triggerSoundVolume / 100;
      const audio = document.getElementById(this.selectedTriggerSound);
      audio.play();
    },
  },
};
</script>
