import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import HomeSel from '../views/HomeSel.vue';
import Trigger from '../views/Trigger.vue';
import TriggerSel from '../views/TriggerSel.vue';
import Statistic from '../views/Statistic.vue';
import StatisticSel from '../views/StatisticSel.vue';
import Account from '../views/Account.vue';
import AccountCreate from '../views/AccountCreate.vue';
import AccountSwitch from '../views/AccountSwitch.vue';
import AccountChange from '../views/AccountChange.vue';
import Privacy from '../views/Privacy.vue';
import PrivacyCookie from '../views/PrivacyCookie.vue';
import PrivacyLegal from '../views/PrivacyLegal.vue';
import Init from '../views/Init.vue';
import Tutorial from '../views/Tutorial.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/home/selection', component: HomeSel },
  { path: '/trigger', component: Trigger },
  { path: '/trigger/selection', component: TriggerSel },
  { path: '/statistic', component: Statistic },
  { path: '/statistic/selection', component: StatisticSel },
  { path: '/account', component: Account },
  { path: '/account/create', component: AccountCreate },
  { path: '/account/switch', component: AccountSwitch },
  { path: '/account/change', component: AccountChange },
  { path: '/privacy', component: Privacy },
  { path: '/privacy/cookie-policy', component: PrivacyCookie },
  { path: '/privacy/legal-and-privacy', component: PrivacyLegal },
  { path: '/init', component: Init },
  { path: '/tutorial', component: Tutorial },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
