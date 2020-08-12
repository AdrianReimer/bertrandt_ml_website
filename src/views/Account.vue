<template>
    <section id="account">
      <v-ons-page style="height:90vh;">
        <v-ons-list>
          <v-ons-list-header>User</v-ons-list-header>
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
          <v-ons-list-header>Settings</v-ons-list-header>
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
                  Daily Emotion overview {{ dailyEmotionSwitchOn ? '(on)' : '(off)' }}
                </label>
                <div class="right">
                  <v-ons-switch input-id="switch1" v-model="dailyEmotionSwitchOn"
                    @change="saveDailyEmotionSwitch">
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
      dailyEmotionSwitchOn: true,
      databaseDialogVisible: false,
      name: '',
      email: '',
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
    this.loadEmotionSwitch();
  },
  methods: {
    loadCurUser() {
      this.$pouch.get('userCur', {}, 'account').then((doc) => {
        this.name = doc.username;
        this.email = doc.email;
      }).catch((err) => {
        console.log(err);
      });
    },

    loadEmotionSwitch() {
      this.$pouch.get('dailyEmotionSwitchOn', {}, 'account').then((doc) => {
        this.dailyEmotionSwitchOn = doc.value;
      }).catch((err) => {
        console.log(err);
      });
    },

    saveDailyEmotionSwitch() {
      this.$pouch.get('dailyEmotionSwitchOn', {}, 'account').then((doc) => {
        doc.value = this.dailyEmotionSwitchOn;
        return this.$pouch.put(doc, {}, 'account');
      }).catch(() => {
        const doc = {
          _id: 'dailyEmotionSwitchOn',
          value: this.dailyEmotionSwitchOn,
        };
        this.$pouch.put(doc, {}, 'account').then(() => {
          console.log('Daily emotion switch saved');
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
