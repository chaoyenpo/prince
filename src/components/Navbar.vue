<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="btn btn-dark py-1" type="button" @click="toggleSidebar">
      <i class="fa fa-bars"></i>
    </button>

    <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false">
      <span class="navbar-toggler-icon"></span>
    </button> -->

    <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link" :to="{name: 'Profile'}">
          Profile
        </router-link>
        <router-link class="nav-item nav-link" :to="{name: 'Account'}">
          Account
        </router-link>
      </div>
    </div> -->
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  components: {
    //
  },
  data() {
    return {
      //
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched;
    },
  },
  methods: {
    ...mapActions({
      toggleSidebar: 'toggleSidebar',
    }),
  },
};
</script>
