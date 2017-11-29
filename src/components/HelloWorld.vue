<template>
  <div class="hello container">
    <h1>{{ msg }}</h1>

    <hr>

    <p class="h3">i18n Test</p>

    <button type="button" class="btn btn-dark" @click="setLanguage('zh')">繁體中文</button>
    <button type="button" class="btn btn-dark" @click="setLanguage('en')">English</button>
    <p class="h5">Text：{{ $t('test') }}</p>

    <hr>

    <p class="h3">Modal Test</p>

    <button type="button" class="btn btn-dark" @click="showModal">開啟Modal</button>

    <div class="modal fade" id="modal-dashboard-announcement" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">

            <h4 class="modal-title">
              Title
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>

          <div class="modal-body">
            <pre>內文</pre>

            <swiper :options="{ 'zoom': true }">
              <swiper-slide>
                <div class="swiper-zoom-container">
                  <img src="https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" style="width: 100%;">
                </div>
              </swiper-slide>
            </swiper>
          </div>

          <!-- Modal Actions -->
          <div class="modal-footer">
            <button type="button" class="btn btn-block btn-secondary" data-dismiss="modal">{{ $t('btn.close') }}</button>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <p class="h3">Login Test</p>
    <button type="button" class="btn btn-dark" @click="onLogin">登入</button>
    <p class="h5">登入帳號：{{ user.username }}</p>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hello',
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions({
      setLanguage: 'setLanguage',
      actionLogin: 'auth/actionLogin',
    }),
    showModal() {
      this.$('#modal-dashboard-announcement').modal('show');
    },
    hideModal() {
      this.$('#modal-dashboard-announcement').modal('hide');
    },
    onLogin() {
      this.actionLogin({
        payload: {
          grant_type: 'password',
          username: 'unyadmin',
          password: '!a123456',
          one_time_password: null,
        },
        context: this,
      }).then().then(() => {
        if (this.errors === 'Maintain') {
          // this.$router.replace({ name: 'Maintain' });
        } else {
          // this.$router.replace({ name: 'Home' });
        }
      });
    },
  },
};
</script>
