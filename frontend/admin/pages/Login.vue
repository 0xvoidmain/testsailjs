<template>
  <div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
      <div>
        <h1 class="logo-name">IN+</h1>
      </div>
      <h3>Welcome to IN+</h3>
      <form class="m-t" role="form" v-on:submit.prevent="login">
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email address" required="" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" required="" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
        <!--
		<a href="#">
          <small>Forgot password?</small>
        </a>
		-->
      </form>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import deep from 'deep-obj';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.$Progress.start();
        axios.post('/api/managers/login', {
          email: this.email.toLowerCase(),
          password: this.password
        })
        .then(({data}) => {
          localStorage.token = data.token;
          localStorage.auth = JSON.stringify(data);
          window.location.href = '/admin';
        })
        .catch(err => {
          var msg = deep.get(err, 'response.data.msg');
          this.$Progress.finish();
          toastr.error(msg, 'Error');
        });
      }
    }
  }
}
</script>
