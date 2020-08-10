<template>
    <section id="account">
      <v-ons-page style="height:90vh;">
        <v-ons-list>
          <v-ons-list-header>User</v-ons-list-header>
          <v-ons-list-item>
            <label class="left">
              Name: {{ this.$user }}
            </label>
          </v-ons-list-item>
          <v-ons-list-item>
            <label class="left">
              E-mail: {{ this.$email }}
            </label>
          </v-ons-list-item>
          <v-ons-list-header>Settings</v-ons-list-header>
            <v-ons-list>
              <ons-list-item tappable
              @click="createUser();">
                Create user
              </ons-list-item>
              <ons-list-item tappable
              @click="userDialogVisible = true;">
                Switch user
              </ons-list-item>
              <ons-list-item tappable
              @click="userChangeDialogVisible = true;">
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

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userDialogVisible"
    >
    Please select a user from the list
    <template slot="footer">
      <ons-list-item v-if="users[0]" tappable @click="switchUser('user0')">
        {{ this.users[0] }}
      </ons-list-item>
      <ons-list-item v-if="users[1]" tappable @click="switchUser('user1')">
        {{ this.users[1] }}
      </ons-list-item>
      <ons-list-item v-if="users[2]" tappable @click="switchUser('user2')">
        {{ this.users[2] }}
      </ons-list-item>
      <v-ons-alert-dialog-button style="color: red" @click="userDialogVisible = false">
        cancel
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userCreateDialogVisible"
    >
    Please enter a username and email for your new account
    <template slot="footer">
      <ons-input id="newUsername"
                 modifier="underbar=false"
                 placeholder="Username"
                 style="width: 100vw"
                 float>
      </ons-input>
      <ons-input id="newEmail"
                 modifier="underbar=false"
                 placeholder="E-mail"
                 style="width: 100vw"
                 float>
      </ons-input>
      <v-ons-alert-dialog-button tappable style="color: red"
      @click="userCreateDialogVisible = false">
        Cancel
      </v-ons-alert-dialog-button>
      <v-ons-alert-dialog-button @click="saveUser()">
        Submit
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userCreationFailedDialogVisible"
    >
    Please enter a username with atleast 3 characters in length
    <template slot="footer">
      <v-ons-alert-dialog-button
      @click="userCreationFailedDialogVisible = false; userCreateDialogVisible = true">
        Ok
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="emailCreationFailedDialogVisible"
    >
    Please enter a valid email
    <template slot="footer">
      <v-ons-alert-dialog-button
      @click="emailCreationFailedDialogVisible = false; userCreateDialogVisible = true">
        Ok
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userCreateFailedDialogVisible"
    >
    Sorry, you hit the user limit.
    <template slot="footer">
      <v-ons-alert-dialog-button
      @click="userCreateFailedDialogVisible = false;">
        Ok
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userChangeDialogVisible"
    >
    Please enter a new username and email for your account
    <template slot="footer">
      <ons-input id="changedUsername"
                 modifier="underbar=false"
                 placeholder="Username"
                 :value="this.$user"
                 style="width: 100vw"
                 float>
      </ons-input>
      <ons-input id="changedEmail"
                 modifier="underbar=false"
                 placeholder="E-mail"
                 :value="this.$email"
                 style="width: 100vw"
                 float>
      </ons-input>
      <v-ons-alert-dialog-button tappable style="color: red"
      @click="userChangeDialogVisible = false">
        Cancel
      </v-ons-alert-dialog-button>
      <v-ons-alert-dialog-button tappable @click="changeUser()">
        Submit
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userChangeFailedDialogVisible"
    >
    Sorry, that name already exists. Please select a different name.
    <template slot="footer">
      <v-ons-alert-dialog-button
      @click="userChangeFailedDialogVisible = false; userChangeDialogVisible = true;">
        Ok
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userCreateFailedDialog2Visible"
    >
    Sorry, that name already exists. Please select a different name.
    <template slot="footer">
      <v-ons-alert-dialog-button
      @click="userCreateFailedDialog2Visible = false; userCreateDialogVisible = true;">
        Ok
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
      userDialogVisible: false,
      userCreateDialogVisible: false,
      userCreateFailedDialogVisible: false,
      userCreateFailedDialog2Visible: false,
      userChangeDialogVisible: false,
      userChangeFailedDialogVisible: false,
      databaseDialogVisible: false,
      userCreationFailedDialogVisible: false,
      emailCreationFailedDialogVisible: false,
      name: 'Admin',
      email: 'admin@gmail.com',
      users: [this.$user, NaN, NaN],
      freeUserIdx: 0,
    };
  },
  mounted() {
    Vue.prototype.stopDraw();
    // load daily emotion switch
    this.$pouch.get('dailyEmotionSwitchOn', {}, 'account').then((doc) => {
      this.dailyEmotionSwitchOn = doc.value;
    }).catch((err) => {
      console.log(err);
    });
    this.getUsers();
  },
  methods: {
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
      this.$pouch.destroy(`${this.$user}home`);
      this.$pouch.destroy(`${this.$user}trigger`);
      this.$pouch.destroy(`${this.$user}statistic`);
      this.databaseDialogVisible = false;
    },

    getUsers() {
      this.$pouch.get('user0', {}, 'account').then((doc) => {
        this.users[0] = doc.username;
      }).catch((err) => {
        console.log(err);
      });
      this.$pouch.get('user1', {}, 'account').then((doc) => {
        this.users[1] = doc.username;
      }).catch((err) => {
        console.log(err);
      });
      this.$pouch.get('user2', {}, 'account').then((doc) => {
        this.users[2] = doc.username;
      }).catch((err) => {
        console.log(err);
      });
    },

    hasUserSpace() {
      for (let i = 1; i < this.users.length; i += 1) {
        if (!this.users[i]) {
          this.freeUserIdx = i;
          return true;
        }
      }
      return false;
    },

    createUser() {
      if (this.hasUserSpace()) {
        this.userCreateDialogVisible = true;
      } else {
        this.userCreateFailedDialogVisible = true;
      }
    },

    saveUser() {
      const username = document.getElementById('newUsername').value;
      for (let i = 0; i < this.users.length; i += 1) {
        if (username === this.users[i]) {
          this.userChangeFailedDialog2Visible = true;
          return;
        }
      }
      const email = document.getElementById('newEmail').value;
      if (username && username.length >= 3) {
        if (email && (email.includes('@') && email.includes('.'))) {
          const doc1 = {
            _id: `user${this.freeUserIdx}`,
            username,
            email,
          };
          this.$pouch.put(doc1, {}, 'account').then(() => {
            console.log('account saved');
          }).catch((err) => {
            console.log(err);
          });
          this.$pouch.get('userCur', {}, 'account').then((doc) => {
            doc.username = username;
            doc.email = email;
            return this.$pouch.put(doc, {}, 'account');
          }).catch((err) => {
            console.log(err);
          });
          this.userCreateDialogVisible = false;
          Vue.prototype.$user = username;
          Vue.prototype.$email = email;
          this.users[this.freeUserIdx] = username;
          // clear form
          document.getElementById('newUsername').value = '';
          document.getElementById('newEmail').value = '';
        } else {
          this.emailCreationFailedDialogVisible = true;
        }
      } else {
        this.userCreationFailedDialogVisible = true;
      }
    },

    switchUser(user) {
      let username = '';
      let email = '';
      // get selected user
      this.$pouch.get(user, {}, 'account').then((doc) => {
        username = doc.username;
        email = doc.email;
        // update global user
        Vue.prototype.$user = username;
        Vue.prototype.$email = email;
        this.userDialogVisible = false;
      }).catch((err) => {
        console.log(err);
      });
      // update current user
      this.$pouch.get('userCur', {}, 'account').then((doc) => {
        doc.username = username;
        doc.email = email;
        return this.$pouch.put(doc, {}, 'account');
      }).catch((err) => {
        console.log(err);
      });
    },

    changeUser() {
      const username = document.getElementById('changedUsername').value;
      for (let i = 0; i < this.users.length; i += 1) {
        if (username === this.users[i]) {
          this.userCreateFailedDialog2Visible = true;
          return;
        }
      }
      const email = document.getElementById('changedEmail').value;
      this.$pouch.get('userCur', {}, 'account').then((docCur) => {
        const tmpUsername = docCur.username;
        docCur.username = username;
        docCur.email = email;
        console.log(tmpUsername);
        for (let i = 0; i < this.users.length; i += 1) {
          if (tmpUsername === this.users[i]) {
            this.users[i] = username;
            this.$pouch.get(`user${i}`, {}, 'account').then((docNum) => {
              docNum.username = username;
              docNum.email = email;
              return this.$pouch.put(docNum, {}, 'account');
            }).catch((err) => {
              console.log(err);
            });
          }
        }
        return this.$pouch.put(docCur, {}, 'account');
      }).catch((err) => {
        console.log(err);
      });
      // update global user
      Vue.prototype.$user = username;
      Vue.prototype.$email = email;
      this.clearDatabase();
      this.userChangeDialogVisible = false;
    },
  },
};
</script>

<style lang="css">
    .left {
      tab-size: 4;
    }
</style>
