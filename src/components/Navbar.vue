<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-2 text-truncate">
    <div class="d-flex justify-content-between align-items-center w-100">

      <button class="btn btn-dark py-1" type="button" @click="toggleSidebar">
        <i class="fa fa-bars"></i>
      </button>

      <span class="nav-item text-gray-600">嗨 XXX , 您目前等級 <span class="badge badge-primary">Diamond</span></span>
    </div>

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
