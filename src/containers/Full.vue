<template>
  <div class="app sidebar-has bg-fluid d-flex flex-column justify-content-end" :class="{'sidebar-show': sidebarStatus}">
    <app-navbar></app-navbar>
    <app-header></app-header>
    <sidebar></sidebar>
    <div>
      <router-view></router-view>
    </div>
    <app-footer class="mt-auto"></app-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Navbar as AppNavbar, Header as AppHeader, Sidebar, Footer as AppFooter } from '../components';

export default {
  name: 'Full',
  components: {
    AppNavbar,
    AppHeader,
    Sidebar,
    AppFooter,
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
