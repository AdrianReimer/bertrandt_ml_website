<template>
    <section id="account">
      <v-ons-page style="height:90vh;">
        <v-ons-list>
          <v-ons-list-header style="font-size: 4vmin">User</v-ons-list-header>
          <v-ons-list-item>
            <label class="left">
              Name: {{ name }}
            </label>
          </v-ons-list-item>
          <v-ons-list-item>
            <label class="left">
              E-mail: {{ email }}
            </label>
          </v-ons-list-item>
          <v-ons-list-header style="font-size: 4vmin">Settings</v-ons-list-header>
            <v-ons-list>
              <ons-list-item tappable
              @click="$router.push('/account/create')">
                Create user
              </ons-list-item>
              <ons-list-item tappable
              @click="$router.push('/account/switch')">
                Switch user
              </ons-list-item>
              <ons-list-item tappable
              @click="$router.push('/account/change')">
                Change user
              </ons-list-item>
              <ons-list-item tappable
              @click="databaseDialogVisible = true;">
                Clear database
              </ons-list-item>
              <ons-list-item>
                <label class="center" for="switch1">
                  Backend prediction
                </label>
                <div class="right">
                  <v-ons-switch input-id="switch1" v-model="backendPredictionOn"
                    @change="saveBackendPredictionSwitch">
                  </v-ons-switch>
                </div>
              </ons-list-item>
            </v-ons-list>
        </v-ons-list>
      </v-ons-page>
    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="databaseDialogVisible"
    >
    Do you really want to clear your database?
    <template slot="footer">
      <v-ons-alert-dialog-button @click="databaseDialogVisible = false">
        no
      </v-ons-alert-dialog-button>
      <v-ons-alert-dialog-button @click="clearDatabase()">
        yes
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>
    </section>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      backendPredictionOn: true,
      databaseDialogVisible: false,
      name: '',
      email: '',
      user: '',
    };
  },
  mounted() {
    try {
      Vue.prototype.stopDraw();
    } catch {
      console.log('stopDraw function not defined');
    }
    // load daily emotion switch
    this.loadCurUser();
  },
  methods: {
    loadCurUser() {
      this.$pouch.get('userCur', {}, 'account').then((doc) => {
        this.name = doc.username;
        this.email = doc.email;
        this.user = doc.name;
        this.loadEmotionSwitch();
      }).catch((err) => {
        console.log(err);
      });
    },

    loadEmotionSwitch() {
      this.$pouch.get('backendPredictionSwitchOn', {}, `${this.user}home`).then((doc) => {
        this.backendPredictionOn = doc.value;
      }).catch((err) => {
        console.log(err);
      });
    },

    saveBackendPredictionSwitch() {
      this.$pouch.get('backendPredictionSwitchOn', {}, `${this.user}home`).then((doc) => {
        doc.value = this.backendPredictionOn;
        return this.$pouch.put(doc, {}, `${this.user}home`);
      }).catch(() => {
        const doc = {
          _id: 'backendPredictionSwitchOn',
          value: this.backendPredictionOn,
        };
        this.$pouch.put(doc, {}, `${this.user}home`).then(() => {
          console.log('backend prediction activated');
        }).catch((err) => {
          console.log(err);
        });
      });
    },

    clearDatabase() {
      this.$pouch.destroy(`${this.name}home`);
      this.$pouch.destroy(`${this.name}trigger`);
      this.$pouch.destroy(`${this.name}statistic`);
      this.databaseDialogVisible = false;
    },
  },
};
</script>

<style lang="css">
    .left {
      tab-size: 4;
    }
</style>
