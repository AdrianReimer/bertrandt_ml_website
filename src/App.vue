<template>
  <div>
    <MicRequest />
    <TheNavbar />
    <router-view />
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
import TheNavbar from './components/TheNavbar.vue';
import MicRequest from './components/MicRequest.vue';

PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);
Vue.use(PouchVue, {
  pouch: PouchDB,
});
Vue.use(VueOnsen);

export default {
  components: {
    TheNavbar, MicRequest,
  },
};
</script>
