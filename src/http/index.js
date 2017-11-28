/**
 * Create Chaoyenpo on 2017-10-28.
 * http設定
 */

import axios from 'axios';
import store from '../store';
import router from '../router';

// axios defaults
axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  if (store.state.auth.accessToken) {
    config.headers.Authorization = `Bearer ${store.state.auth.accessToken}`; // eslint-disable-line no-param-reassign
  }
  return config;
}, (error) => {
  Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(response => response, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.dispatch('auth/clearAuth');
        router.replace({ name: 'Login' });
        break;

      // no default
    }
  }
  return Promise.reject(error);
});

export default axios;
