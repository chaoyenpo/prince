<template>
  <div class="animated fadeIn">

    <div class="modal fade" id="modal-dashboard-announcement" tabindex="-1" role="dialog" v-if="!$_.isEmpty(announcements)">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close mr-3" data-dismiss="modal" aria-hidden="true">&times;</button>

            <h4 class="modal-title">
                {{ announcements[0].title }}
            </h4>
          </div>

          <div class="modal-body">
            <pre>{{ announcements[0].content }}</pre>

            <swiper :options="{ 'zoom': true }">
              <swiper-slide>
                <div class="swiper-zoom-container">
                  <img :src="announcements[0].image_path" style="width: 100%;">
                </div>
              </swiper-slide>
            </swiper>
          </div>

          <!-- Modal Actions -->
          <div class="modal-footer">
            <button type="button" class="btn btn-block btn-secondary" data-dismiss="modal">Close</button>
            <!-- <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn> -->
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-4 wrap">
      <div class="row">
        <div class="col-lg-3 mb-lg-0 mx-3 mx-lg-0 d-flex flex-column justify-content-between">
          <div class="metal-glass-bg text-white text-center py-4 mb-4">
            <p class="h5">{{ $t('dashboard.user_info') }}</p>
            <img class="img-fluid rounded-circle my-3" src="static/img/uny/avatar.png" width="75" style="background-color: #000;"/>
            <p class="h5">{{ user.username }}</p>
            <p class="h5">{{ user.email }}</p>
          </div>
          <div class="d-none d-lg-block">
            <img style="img-fluid" width="250" src="static/img/uny/bigcorn1.png"/>
          </div>
        </div>

        <div class="col-lg-9 text-white h-100">
          <p class="d-inline-block bg-silver text-black h5 px-5 py-1 mb-4">{{ $t('dashboard.announcement') }}</p>
          <div class="bg-big-glass bg-cover mb-4 p-3" v-for="announcement in announcements">
            {{ announcement.title }}
            <hr class="bg-white">
            <p style="white-space: pre-wrap;">{{ announcement.content }}</p>
            <swiper :options="{ 'zoom': true }">
              <swiper-slide>
                <div class="swiper-zoom-container">
                  <img :src="announcement.image_path" style="width: 100%;">
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'dashboard',
  components: {
    swiper,
    swiperSlide,
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
