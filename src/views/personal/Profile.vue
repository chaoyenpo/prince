<template>
  <div class="animated fadeIn">

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'Profile',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters({
      //
    }),
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions({
      //
    }),
  },
};
</script>
