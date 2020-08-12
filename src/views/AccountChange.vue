<template>
  <section id="accountSwitch">
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <v-ons-list-header id="inputSel">USERS
            <v-ons-button id="closeBtn" @click="$router.push('/account')">
                <i class="fa fa-times" id="closeIcon"></i>
            </v-ons-button>
        </v-ons-list-header>
        <ons-input id="changedUsername"
                    modifier="underbar=false"
                    placeholder="Username"
                    :value="user"
                    style="width: 100vw"
                    float>
        </ons-input>
        <ons-input id="changedEmail"
                    modifier="underbar=false"
                    placeholder="E-mail"
                    :value="email"
                    style="width: 100vw"
                    float>
        </ons-input>
        <v-ons-alert-dialog-button tappable @click="changeUser()">
            Submit
        </v-ons-alert-dialog-button>
      </v-ons-list>
    </v-ons-page>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userChangeFailedDialogVisible"
    >
    Sorry, that name already exists. Please select a different name.
    <template slot="footer">
      <v-ons-alert-dialog-button
      @click="userChangeFailedDialogVisible = false;">
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
      @click="userCreateFailedDialog2Visible = false;">
        Ok
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userChangeFailedDialogVisible: false,
      userCreateFailedDialog2Visible: false,
      users: [],
      user: '',
      email: '',
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$pouch.get('user0', {}, 'account').then((doc) => {
        this.users.push(doc.username);
      }).catch((err) => {
        console.log(err);
      });
      this.$pouch.get('user1', {}, 'account').then((doc) => {
        this.users.push(doc.username);
      }).catch((err) => {
        console.log(err);
      });
      this.$pouch.get('user2', {}, 'account').then((doc) => {
        this.users.push(doc.username);
      }).catch((err) => {
        console.log(err);
      });
      this.$pouch.get('userCur', {}, 'account').then((doc) => {
        this.user = doc.username;
        this.email = doc.email;
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
        for (let i = 0; i < this.users.length; i += 1) {
          console.log(`${tmpUsername}--${this.users[i]}`);
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
        this.$router.push('/account');
        return this.$pouch.put(docCur, {}, 'account');
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
