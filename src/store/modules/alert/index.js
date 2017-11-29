const state = {
  alerts: [],
};

const getters = {
  alerts: state => state.alerts,
};

const actions = {
  setAlert({ state, commit }, text, variant = 'info') {
    commit('setAlert', { id: state.alerts.length, text, variant });
  },
  closeAlert({ commit }, alert) {
    commit('closeAlert', alert);
  },
};

const mutations = {
  setAlert(state, alert) {
    state.alerts.push(alert);
  },
  closeAlert(state, alert) {
    const index = state.alerts.indexOf(alert);
    if (index !== -1) {
      state.alerts.splice(index, 1);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
