import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import i18n from '@/main';
import router from '../router';

// Components
import alert from './modules/alert/';
import auth from './modules/auth/';
import member from './modules/member/';


Vue.use(Vuex);

const state = {
  baseURL: process.env.BASE_URL,
  loading: false,
  logoutTime: 0,
  lang: 'zh',
  sidebarStatus: true,
};

const getters = {
  baseURL: state => state.baseURL,
  loading: state => state.loading,
  logoutTime: state => state.logoutTime,
  autologoutAlert: state => state.autologoutAlert,
  lang: state => state.lang,
  sidebarStatus: state => state.sidebarStatus,
};

const actions = {
  initialize() {
    // 清空 Alert
    // 清除 Auth
  },

  // test ok
  toggleSidebar({ commit }) {
    commit('toggleSidebar');
  },

  // test ok
  setLanguage({ commit }, lang) {
    commit('setLanguage', lang);
    // location.reload();
  },

  // test ok
  autoLogout({ state, dispatch, commit }) {
    clearTimeout(window.autoLogoutTimeout);
    commit('setNextLogoutTime');
    const needLogoutTime = process.env.NODE_ENV !== 'production' ? 9999999 : 180;
    if (state.logoutTime <= needLogoutTime) {
      window.autoLogoutTimeout = setTimeout(() => dispatch('autoLogout'), 1000);
    } else {
      dispatch('auth/actionLogout').then(() => {
        dispatch('alert/setAlert', i18n.t('login.auto_logout_alert'));
        router.replace({ name: 'Login' });
      });
    }
  },
};

const mutations = {
  setLoading(state, status) {
    state.loading = status;
  },
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
  toggleSidebar(state) {
    state.sidebarStatus = !state.sidebarStatus;
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
    member,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
