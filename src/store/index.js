import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import i18n from '@/main';
import store from '../store';

// Components
import alert from './modules/alert/';

import auth from './modules/auth/';


Vue.use(Vuex);

const state = {
  baseURL: process.env.BASE_URL,
  loading: false,
  logoutTime: 0,
  lang: 'zh',
};

const getters = {
  baseURL: state => state.baseURL,
  loading: state => state.loading,
  logoutTime: state => state.logoutTime,
  autologoutAlert: state => state.autologoutAlert,
  lang: state => state.lang,
};

const actions = {
  initialize() {
    // 清空 Alert
    // 清除 Auth
  },

  // test ok
  setLanguage({ commit }, lang) {
    commit('setLanguage', lang);
    // location.reload();
  },

  setAutologoutAlert({ commit }, trueOrFalse) {
    commit('setAutologoutAlert', trueOrFalse);
  },

  autoLogout({ dispatch, commit }) {
    clearTimeout(window.autoLogoutTimeout);
    commit('setNextLogoutTime');
    const needLogoutTime = process.env.NODE_ENV !== 'production' ? 5 : 180;
    if (state.logoutTime <= needLogoutTime) {
      window.autoLogoutTimeout = setTimeout(() => dispatch('autoLogout'), 1000);
    } else {
      dispatch('auth/actionLogout').then(() => {
        dispatch('alert/setAlert', i18n.t('auto_logout_alert'));
        // commit('setAutologoutAlert', true);
        store.state.router.replace({ name: 'Login' });
      });
    }
  },
};

const mutations = {
  // test ok
  setLoading(state, status) {
    state.loading = status;
  },
  // test ok
  setLanguage(state, lang) {
    state.lang = lang;
    i18n.locale = lang;
  },
  setLogoutTime(state, time) {
    state.logoutTime = time;
  },
  setNextLogoutTime(state) {
    state.logoutTime += 1;
  },
  setAutologoutAlert(state, trueOrFalse) {
    state.autologoutAlert = trueOrFalse;
  },
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth,
    alert,
  },
  plugins: [
    // createPersistedState({
    //   storage: window.sessionStorage,
    // }),
  ],
});
