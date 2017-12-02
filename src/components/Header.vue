<template>
  <header class="border border-gray-300 border-left-0 border-right-0 bg-light text-truncate">
    <p class="h3 font-weight-light pl-3 py-3 mb-0">{{ name }}</p>
  </header>
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
      return this.$t(`header.${this.$route.meta.name}`);
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
