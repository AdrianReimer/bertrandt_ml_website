<template>
  <section id="accountCreate">
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <v-ons-list-header id="inputSel" style="font-size: 4vmin; padding-bottom: 3vh">USERS
            <v-ons-button id="closeBtn" @click="$router.push('/account')">
                <i class="fa fa-times" id="closeIcon"></i>
            </v-ons-button>
        </v-ons-list-header>
      <ons-input id="newUsername"
                 modifier="underbar=false"
                 placeholder="Username"
                 style="width: 100vw; height: 8vh"
                 float>
      </ons-input>
      <ons-input id="newEmail"
                 modifier="underbar=false"
                 placeholder="E-mail"
                 style="width: 100vw; height: 5vh"
                 float>
      </ons-input>
      <v-ons-alert-dialog-button @click="createUser()">
        Submit
      </v-ons-alert-dialog-button>
      </v-ons-list>
    </v-ons-page>

    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userCreationFailedDialogVisible"
    >
    Please enter a username with atleast 3 characters in length
    <template slot="footer">
      <v-ons-alert-dialog-button
      @click="userCreationFailedDialogVisible = false">
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
      @click="emailCreationFailedDialogVisible = false">
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      userCreateFailedDialogVisible: false,
      emailCreationFailedDialogVisible: false,
      userCreationFailedDialogVisible: false,
      users: [NaN, NaN, NaN],
      freeUserIdx: 0,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
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
      for (let i = 0; i < this.users.length; i += 1) {
        if (!this.users[i]) {
          this.freeUserIdx = i;
          return true;
        }
      }
      return false;
    },

    createUser() {
      if (this.hasUserSpace()) {
        this.saveUser();
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
            this.$router.push('/');
          }).catch((err) => {
            console.log(err);
          });
          this.$pouch.get('userCur', {}, 'account').then((doc) => {
            doc.name = `user${this.freeUserIdx}`;
            doc.username = username;
            doc.email = email;
            this.$router.push('/account');
            return this.$pouch.put(doc, {}, 'account');
          }).catch((err) => {
            const doc2 = {
              _id: 'userCur',
              name: `user${this.freeUserIdx}`,
              username,
              email,
            };
            this.$pouch.put(doc2, {}, 'account').then(() => {
              console.log('account saved');
              this.$router.push('/');
            }).catch((err2) => {
              console.log(err2);
            });
            console.log(err);
          });
        } else {
          this.emailCreationFailedDialogVisible = true;
        }
      } else {
        this.userCreationFailedDialogVisible = true;
      }
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

  .checkbox {
    position: relative;
    float: right;
    bottom: 0px;
  }
</style>
