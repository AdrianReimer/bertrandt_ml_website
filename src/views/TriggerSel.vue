<template>
  <section id="triggerSel">
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <v-ons-list-header id="inputSel">LABEL
            <v-ons-button id="closeBtn" @click="$router.push('/trigger')">
                <i class="fa fa-times" id="closeIcon"></i>
            </v-ons-button>
        </v-ons-list-header>
        <v-ons-list-item v-for="(triggerLabel, $index) in triggerLabels"
        v-bind:key="triggerLabel" tappable>
            <label class="left">
            <v-ons-radio
                :input-id="'radio-2' + $index"
                :value="triggerLabel"
                v-model="selectedTriggerLabel"
                @change="saveTriggerLabel()">
            </v-ons-radio>
            </label>
            <label :for="'radio-2' + $index" class="center">
            {{ triggerLabel }}
            </label>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
  </section>
</template>

<script>
export default {
  data() {
    return {
      triggerLabels: ['Angry', 'Disgusted', 'Scared', 'Happy', 'Neutral', 'Sad', 'Surprised'],
      selectedTriggerLabel: '',
    };
  },
  mounted() {
    this.loadTriggerLabel();
  },
  methods: {
    loadTriggerLabel() {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('triggerCur', {}, `${user.name}trigger`).then((doc1) => {
          this.$pouch.get(`trigger${doc1.value}`, {}, `${user.name}trigger`).then((doc2) => {
            this.selectedTriggerLabel = doc2.value;
            return this.$pouch.put(doc2, {}, `${user.name}trigger`);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    saveTriggerLabel() {
      this.$pouch.get('userCur', {}, 'account').then((user) => {
        this.$pouch.get('triggerCur', {}, `${user.name}trigger`).then((doc1) => {
          this.$pouch.get(`trigger${doc1.value}`, {}, `${user.name}trigger`).then((doc2) => {
            doc2.value = this.selectedTriggerLabel;
            this.$router.push('/trigger');
            return this.$pouch.put(doc2, {}, `${user.name}trigger`);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
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
