<template>
  <nav class="navbar-default navbar-static-side white-bg" role="navigation" style="position: fixed">
    <div class="sidebar-collapse">
      <ul class="nav" id="side-menu">
        <li class="nav-header">
          <div class="dropdown profile-element">
            <span>
              <img alt="image" class="img-circle" src="/images/profile_small.jpg" />
            </span>
            <a>
              <span class="clear">
                <span class="block m-t-xs">
                  <strong class="font-bold">{{auth.name}}</strong>
                </span>
                <span class="text-muted text-xs block">{{auth.role == 'super-admin' ? 'Super Admin' : 'Admin'}}</span>
              </span>
            </a>
          </div>
          <div class="logo-element">
            GO
          </div>
        </li>

        <li v-for="(e, index) in items" v-bind:key="e.name + index" v-bind:class="e.active && 'active'" v-on:click="select(e)">
          <a>
            <i v-if="e.icon" v-bind:class="['fa', e.icon]"></i>
            <span class="nav-label">{{e.name}}</span>
            <span v-if="e.items" class="fa arrow"></span>
          </a>
          <ul v-if="e.items" class="nav nav-second-level">
            <li v-for="(e, index) in e.items" v-bind:key="e.name + index">
              <a>
                <i v-if="e.icon" v-bind:class="['fa', e.icon]"></i>
                <span class="nav-label">{{e.name}}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script>
export default {
  data() {
    var pathName = window.location.hash
    const items = [
      {
        icon: 'fa-users',
        active: pathName == '#/' || pathName == '#' || pathName == '/' || pathName.indexOf('dashboard') >= 0,
        name: 'Users',
        href: '/'
      }
    ];
    return {
      auth: window.auth,
      items: items
    }
  },
  methods: {
    select(e) {
      this.items.forEach(e => e.active = false);
      e.active = true;
      this.$router.push(e.href);
    }
  }
}
</script>


<style lang="stylus">
  .navbar-default
      min-height: 100vh
      background: #243746
</style>
