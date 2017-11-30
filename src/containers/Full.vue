<template>
  <div class="app sidebar-has" :class="{'sidebar-show': sidebarStatus}">
    <app-navbar></app-navbar>
    <app-header></app-header>
    <sidebar></sidebar>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Navbar as AppNavbar, Header as AppHeader, Sidebar } from '../components';

export default {
  name: 'Full',
  components: {
    AppNavbar,
    AppHeader,
    Sidebar,
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters({
      sidebarStatus: 'sidebarStatus',
    }),
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched;
    },
  },
};
</script>
