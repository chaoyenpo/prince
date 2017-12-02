<template>
  <nav class="sidebar bg-dark border border-secondary border-left-0 border-top-0 border-bottom-0" :class="{'sidebar-show': sidebarStatus}">
    <div class="d-flex flex-column">

      <div class="sidebar-item text-center text-white">
        <span class="h3">XXX</span>
      </div>

      <router-link class="sidebar-item" :to="{name: 'Home'}">
        <i class="fa fa-home mr-1"></i>
        <span>{{ $t('header.dashboard') }}</span>
      </router-link>

      <div class="sidebar-item" v-b-toggle="'collapse-language'">
        <i class="fa fa-globe mr-1" style="width: 18.56px"></i>
        <span>{{ $t('header.language') }}</span>
      </div>
      <b-collapse id="collapse-language">
        <div class="sidebar-item pl-5 py-1" @click="setLanguage('zh')">
          繁體中文
        </div>
        <div class="sidebar-item pl-5 py-1" @click="setLanguage('en')">
          English
        </div>
      </b-collapse>

      <div class="sidebar-item sidebar-footer" @click="logout">
        <i class="fa fa-sign-out mr-1"></i>
        {{ $t('btn.logout') }}
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
      actionLogout: 'auth/actionLogout',
      setLanguage: 'setLanguage',
    }),
    logout() {
      this.actionLogout().then(() => {
        this.$router.replace({ name: 'Login' });
      });
    },
  },
};
</script>
