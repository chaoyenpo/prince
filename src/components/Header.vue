<template>
  <header class="border border-secondary border-left-0 border-right-0 bg-dark text-white">
    <p class="h3 pl-3 py-3">{{ name }}</p>
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
  mounted() {
    console.log(this.$route);
  },
  methods: {
    ...mapActions({
      toggleSidebar: 'toggleSidebar',
    }),
  },
};
</script>
