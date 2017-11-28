<template>
  <div class="app">
    Full
  </div>
</template>

<script>
export default {
  name: 'Full',
  components: {
    //
  },
  data () {
    //
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  }
}
</script>
