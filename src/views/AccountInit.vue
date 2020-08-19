<template>
  <section id="accountInit">
    <v-ons-page style="height:100vh;">
      <v-ons-list>
        <v-ons-list-header id="inputSel" style="font-size: 4vmin; padding-bottom: 3vh">
            Create Account
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
  methods: {
    createUser() {
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
          const docUsr = {
            _id: 'user0',
            username,
            email,
          };
          this.$pouch.put(docUsr, {}, 'account').then(() => {
            console.log('account saved');
            this.$router.push('/');
          }).catch((err) => {
            console.log(err);
          });
          this.$pouch.get('userCur', {}, 'account').then(() => {
          }).catch((errCur) => {
            const docCur = {
              _id: 'userCur',
              name: 'user0',
              username,
              email,
            };
            this.$pouch.put(docCur, {}, 'account').then(() => {
              console.log('account saved');
              this.$router.push('/');
            }).catch((errCur2) => {
              console.log(errCur2);
            });
            console.log(errCur);
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
  .checkbox {
    position: relative;
    float: right;
    bottom: 0px;
  }
</style>
