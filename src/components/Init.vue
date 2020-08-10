<template>
  <div>
    <v-ons-alert-dialog modifier="rowfooter"
    :visible.sync="userCreationDialogVisible"
    >
    Please enter a username and email for your root account
    <template slot="footer">
      <ons-input id="username"
                 modifier="underbar=false"
                 placeholder="Username"
                 style="width: 100vw"
                 float></ons-input>
      <ons-input id="email"
                 modifier="underbar=false"
                 placeholder="E-mail"
                 style="width: 100vw"
                 float></ons-input>
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
      @click="userCreationFailedDialogVisible = false; userCreationDialogVisible = true">
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
      @click="emailCreationFailedDialogVisible = false; userCreationDialogVisible = true">
        Ok
      </v-ons-alert-dialog-button>
    </template>
    </v-ons-alert-dialog>
  </div>
</template>

<script>
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import PouchDB from 'pouchdb-browser';
import PouchFind from 'pouchdb-find';
import PouchLiveFind from 'pouchdb-live-find';
import PouchVue from 'pouch-vue';
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';

PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);
Vue.use(PouchVue, {
  pouch: PouchDB,
});
Vue.use(VueOnsen);

export default {
  data() {
    return {
      userCreationDialogVisible: false,
      userCreationFailedDialogVisible: false,
      emailCreationFailedDialogVisible: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$pouch.get('user0', {}, 'account').then(() => {
      }).catch(() => {
        this.userCreationDialogVisible = true;
      });
    },

    saveUser() {
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      if (username && username.length >= 3) {
        if (email && (email.includes('@') && email.includes('.'))) {
          const doc1 = {
            _id: 'user0',
            username,
            email,
          };
          this.$pouch.put(doc1, {}, 'account').then(() => {
            console.log('Root account saved');
          }).catch((err) => {
            console.log(err);
          });
          const doc2 = {
            _id: 'userCur',
            username,
            email,
          };
          this.$pouch.put(doc2, {}, 'account').then(() => {
            console.log('Current account saved');
          }).catch((err) => {
            console.log(err);
          });
          this.userCreationDialogVisible = false;
          Vue.prototype.$user = username;
          Vue.prototype.$email = email;
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
