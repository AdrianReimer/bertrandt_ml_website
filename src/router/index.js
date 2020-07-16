import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Trigger from '../views/Trigger.vue';
import Statistic from '../views/Statistic.vue';
import Help from '../views/Help.vue';
import Account from '../views/Account.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/trigger', component: Trigger },
  { path: '/statistic', component: Statistic },
  { path: '/help', component: Help },
  { path: '/account', component: Account },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;