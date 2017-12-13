import Vue from 'vue';
import VueRouter from 'vue-router';
import VueProgressBar from 'vue-progressbar';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
import axios from 'axios';
import * as helper from '../helper';
import './style.styl';

if (!localStorage.token && window.location.pathname != '/admin#/login') {
  window.location.href = '/admin#/login';
}

if (localStorage.token) {
  axios.defaults.headers.common['Authorization'] = localStorage.token;
}

toastr.options = {
  "closeButton": true,
  "timeOut": "3000",
}

try {
  window.auth = JSON.parse(localStorage.auth) || {};
}
catch (ex) {
  window.auth = {};
}

window.getErrorMessage = helper.getErrorMessage;

Vue.use(VueRouter);
Vue.use(VueProgressBar, {
  color: '#1ab394',
  failedColor: 'red',
  height: '2px'
});

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
]
const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount('#app')
