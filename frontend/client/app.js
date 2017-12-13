import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home.vue';
import axios from 'axios';
import './style.styl';
try {
  window.auth = JSON.parse(localStorage.auth) || {};
}
catch (ex) {
  window.auth = {};
}

if (process.env.NODE_ENV == 'production') {

}
else {

}

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
]
const router = new VueRouter({
  mode: 'history',
  routes
});

const app = new Vue({
  router,
  watch: {
    '$route'(to) {
      window.scrollTo(0, 0);
      $('.modal').modal('hide');
    }
  }
}).$mount('#app')
