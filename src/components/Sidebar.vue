<template>
  <nav class="sidebar" :class="{'sidebar-show': sidebarStatus}">
    <div class="d-flex flex-column">

      <div class="sidebar-item text-center">
        <span class="h3">Sidebar</span>
      </div>

      <router-link class="sidebar-item" :to="{name: 'Home'}">
        <i class="fa fa-home mr-1"></i>
        <span>{{ $t('header.dashboard') }}</span>
      </router-link>

      <div class="sidebar-item" v-b-toggle="'collapse1'">
        <i class="fa fa-user mr-1" style="width: 18.56px"></i>
        <span>{{ $t('header.personal') }}</span>
      </div>
      <b-collapse id="collapse1">
        <router-link class="sidebar-item pl-5 py-1" :to="{name: 'Account'}">
          {{ $t('header.account') }}
        </router-link>
        <router-link class="sidebar-item pl-5 py-1" :to="{name: 'Profile'}">
          {{ $t('header.profile') }}
        </router-link>
      </b-collapse>

      <div class="sidebar-item sidebar-footer">
        <i class="fa fa-sign-out mr-1"></i>
        登出
      </div>

    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  components: {
    //
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
  },
  methods: {
    ...mapActions({
      toggleSidebar: 'toggleSidebar',
    }),
  },
};
</script>
