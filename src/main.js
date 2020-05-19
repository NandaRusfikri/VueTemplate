import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';

import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
Vue.use(Viewer);

Vue.config.productionTip = false;

const defaultOptions = {
  baseURL: 'https://reqres.in/',
  timeout: 0,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};
let instance = axios.create(defaultOptions);
instance.interceptors.request.use(function(config) {
  const token = sessionStorage.getItem('token');

  if (token) config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

Vue.prototype.$req = instance;
Vue.prototype.$axios = instance;
Vue.prototype.$url_img = `http://116.197.129.222/service/image/`;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
