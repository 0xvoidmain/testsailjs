<template>
  <div class="row border-bottom">
    <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
      <div class="navbar-header">
        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary" v-on:click="toggleMenu">
          <i class="fa fa-bars"></i>
        </a>
        <div class="navbar-form-custom">{{header || 'Admin'}}</div>
      </div>
      <ul class="nav navbar-top-links navbar-right">
        <li>
          <a v-on:click="logout">
            <i class="fa fa-sign-out"></i> Log out
          </a>
        </li>
      </ul>

    </nav>
  </div>
</template>

<script>
export default {
  props: ['header'],
  methods: {
    logout() {
      delete localStorage.token;
      delete localStorage.auth;
      this.$router.push('/login');
    },
    toggleMenu() {
      $("body").toggleClass("mini-navbar");
      if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
          function() {
            $('#side-menu').fadeIn(500);
          }, 100);
      } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
          function() {
            $('#side-menu').fadeIn(500);
          }, 300);
      } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
      }
    }
  }
}
</script>

<style lang="stylus">
  .navbar-header
    text-transform: uppercase
  .navbar-form-custom
    padding: 15px;
    font-size: 20px;

</style>
