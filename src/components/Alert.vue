<template>
  <transition-group
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div v-for="alert in alerts" :key="alert.id">
      <div class="alert" v-if="true" :class="`alert-${alert.variant}`" role="alert">
        <strong>{{ alert.text }}</strong>
        <button class="close" @click="closeAlert(alert)">
          <span>&times;</span>
        </button>
      </div>
    </div>
  </transition-group>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'alert',
  computed: ({
    ...mapGetters({
      alerts: 'alert/alerts',
    }),
  }),
  methods: {
    ...mapActions({
      closeAlert: 'alert/closeAlert',
    }),
  },
};
</script>
