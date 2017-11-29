// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import lodash from 'lodash';
import swal from 'sweetalert2';
import accounting from 'accounting';
import * as d3 from 'd3';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import jQuery from 'jquery';
import Popper from 'popper.js';

import App from './App';
import VueRouter from './router';
import store from './store';
import lang from './lang';

// Vue Awesome Swiper
Vue.use(VueAwesomeSwiper);

// test ok
// Vue I18n
Vue.use(VueI18n);
const messages = {
  zh: lang.zh,
  en: lang.en,
};
const i18n = new VueI18n({
  locale: store.state.lang, // Set default
  messages,
  fallbackLocale: 'zh',
});
export { i18n as default };

// Vue filter
Vue.filter('currency', (val, bit = 2) => accounting.formatNumber(val, bit));

// Bootstrap Vue
Vue.use(BootstrapVue);

// D3
const d3Plugin = {};
d3Plugin.install = () => Object.defineProperty(Vue.prototype, '$d3', { value: d3 });
Vue.use(d3Plugin);

// Bootstrap4 + jQuery
window.$ = jQuery;
window.jQuery = jQuery;
window.Popper = Popper;
require('bootstrap');

Object.defineProperty(Vue.prototype, '$', { value: jQuery });

// Swal
const swalPlugin = {};
swalPlugin.install = () => Object.defineProperty(Vue.prototype, '$swal', { value: swal });
Vue.use(swalPlugin);

// Lodash
Object.defineProperty(Vue.prototype, '$_', { value: lodash });

// Router
const router = VueRouter;
router.beforeEach(({ meta, path }, from, next) => {
  const { auth = true } = meta;
  const isLogin = Boolean(store.state.auth.authenticated);

  // Initialize
  store.commit('setLoading', false, { root: true });
  store.dispatch('auth/countDown');

  if (isLogin) {
    // Refresh user data
    store.dispatch('auth/fetchUser');
    // Initialize auto logout
    store.commit('setLogoutTime', 0, { root: true });
    // Start auto logout
    store.dispatch('autoLogout');
  }

  if (isLogin && path === '/pages/login') {
    return next({ name: 'Home' });
  }

  if (auth && !isLogin && path !== '/pages/login') {
    return next({ path: 'Login' });
  }

  return next();
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
});
