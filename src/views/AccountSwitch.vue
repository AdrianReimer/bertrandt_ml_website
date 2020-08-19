<template>
  <section id="accountSwitch">
    <v-ons-page style="height:90vh;">
      <v-ons-list>
        <v-ons-list-header id="inputSel" style="font-size: 4vmin; padding-bottom: 3vh">USERS
            <v-ons-button id="closeBtn" @click="$router.push('/account')">
                <i class="fa fa-times" id="closeIcon"></i>
            </v-ons-button>
        </v-ons-list-header>
        <ons-list-item v-if="users[0]" tappable @click="switchUser('user0')">
            {{ this.users[0] }}
        </ons-list-item>
        <ons-list-item v-if="users[1]" tappable @click="switchUser('user1')">
            {{ this.users[1] }}
        </ons-list-item>
        <ons-list-item v-if="users[2]" tappable @click="switchUser('user2')">
            {{ this.users[2] }}
        </ons-list-item>
      </v-ons-list>
    </v-ons-page>
  </section>
</template>

<script>
export default {
  data() {
    return {
      users: [],
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
    },

    switchUser(user) {
      let username = '';
      let email = '';
      // get selected user
      this.$pouch.get(user, {}, 'account').then((doc) => {
        username = doc.username;
        email = doc.email;
        this.userDialogVisible = false;
      }).catch((err) => {
        console.log(err);
      });
      // update current user
      this.$pouch.get('userCur', {}, 'account').then((doc) => {
        doc.name = user;
        doc.username = username;
        doc.email = email;
        this.$router.push('/account');
        return this.$pouch.put(doc, {}, 'account');
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
