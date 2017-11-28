import axios from '../../../http';

const state = {
  authenticated: false,
  user: {
    username: '無',
  },
  accessToken: null,
  verification: {
    resendSec: 0,
  },
};

const getters = {
  authenticated: state => state.authenticated,
  user: state => state.user,
  accessToken: state => state.accessToken,
  verification: state => state.verification,
};

const actions = {
  // test ok
  actionLogin({ dispatch, commit }, { payload, context }) {
    commit('setLoading', true, { root: true });

    return axios.post('/oauth/token', payload)
      .then(
        response => dispatch('setToken', response.data.access_token)
          .then(
            () => dispatch('checkLogin', { payload, context }),
          ),
      ).catch(
        (error) => {
          commit('setLoading', false, { root: true });

          if (typeof error.response.data.errors === 'object') {
            Object.assign(context.errors, error.response.data.errors);
          } else {
            Object.assign(context.errors, error.response.data);
          }
        },
      );
  },

  // test ok
  setToken({ dispatch, commit }, token) {
    commit('setAccessToken', token);
  },

  // test ok
  checkLogin({ dispatch, commit }, { payload }) {
    return axios.post('/api/v2/auth/appLogin', payload).then((response) => {
      commit('setLoading', false, { root: true });
      commit('setAuthenticated', true);
      commit('setUserData', response.data.data);
    }).catch((error) => {
      commit('setLoading', false, { root: true });
      return Promise.reject(error);
    });
  },

  actionLogout({ dispatch }) {
    return axios.post('/api/v2/auth/appLogout').then(() => dispatch('clearAuth'));
  },

  actionSendVerification({ dispatch, commit }) {
    return axios.post('/api/v2/auth/tradeVerificationCode').then((response) => {
      commit('setVerification', response.data.data);
      dispatch('countDown');
    });
  },

  actionSendResetPasswordMail({ dispatch, commit }, { payload, context }) {
    commit('setLoading', true, { root: true });
    return axios.post('/api/v2/auth/passwordEmail', payload).then(() => {
      commit('setLoading', false, { root: true });

      return Promise.resolve();
    }).catch((error) => {
      commit('setLoading', false, { root: true });
      if (typeof error.response.data.errors === 'object') {
        Object.assign(context.errors, error.response.data.errors);
      } else {
        Object.assign(context.errors, error.response.data);
      }
      return Promise.reject(error);
    });
  },

  actionResetPassword({ dispatch, commit }, { payload, context }) {
    commit('setLoading', true, { root: true });
    return axios.post('/api/v2/auth/passwordReset', payload).then(() => {
      commit('setLoading', false, { root: true });

      return Promise.resolve();
    }).catch((error) => {
      commit('setLoading', false, { root: true });
      if (typeof error.response.data.errors === 'object') {
        Object.assign(context.errors, error.response.data.errors);
      } else {
        Object.assign(context.errors, error.response.data);
      }
      return Promise.reject(error);
    });
  },

  fetchUser({ commit }) {
    return axios.get('/api/v2/user').then((response) => {
      commit('setLoading', false, { root: true });
      commit('setUserData', response.data.data);
    }).catch(() => {
      commit('setLoading', false, { root: true });
    });
  },

  clearAuth({ commit }) {
    commit('setAuthenticated', false);
    commit('setUserData', {});
    commit('setAccessToken', null);
    commit('setJumpAnnouncement', true, { root: true });
  },

  countDown({ dispatch, commit }) {
    commit('setCountDown');
    if (this.state.auth.verification.resendSec > 0) {
      setTimeout(() => {
        dispatch('countDown');
      }, 1000);
    }
  },
};

const mutations = {
  setAuthenticated(state, trueOrFalse) {
    state.authenticated = trueOrFalse;
  },
  setUserData(state, data) {
    state.user = data;
  },
  setAccessToken(state, token) {
    state.accessToken = token;
  },
  setVerification(state, data) {
    state.verification.resendSec = data.sec;
  },
  setCountDown(state) {
    state.verification.resendSec -= 1;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
