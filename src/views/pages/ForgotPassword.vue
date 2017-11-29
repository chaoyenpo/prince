<template>
  <div class="container-fuild login-bg bg-cover bg-fluid d-flex align-items-center">
    <div class="spinner" v-if="loading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
    <section class="container animated fadeIn" v-else>
      <div class="row justify-content-center text-white">

        <div class="col-md-6 text-center mt-5">
          <div>
            <img class="img-fluid d-none d-lg-block" src="static/img/uny/loginpig.png">
            <img class="img-fluid d-lg-none" width="250" src="static/img/uny/loginpig.png">
          </div>
        </div>

        <div class="col-md-6 text-center my-5">
          <div>
              <img class="img-fluid" src="static/img/uny/logo-word.png">

              <div class="alert alert-danger mt-3" v-if="errors.message">
                {{ errors.message[0] }}
              </div>
            <form @submit.prevent>
              <b-form-group>
                <input type="text" placeholder="Username" class=" form-control form-control-lg in-login" :class="{ 'is-invalid': errors.username }" v-model="form.username" @keyup.enter="submit" required>
                <span class="invalid-feedback" v-if="errors.username">
                  {{ errors.username[0] }}
                </span>
              </b-form-group>
              <b-form-group>
                <input type="text" placeholder="Email" class=" form-control form-control-lg in-login" :class="{ 'is-invalid': errors.email }" v-model="form.email" @keyup.enter="submit" required>
                <span class="invalid-feedback" v-if="errors.email">
                  {{ errors.email[0] }}
                </span>
              </b-form-group>

              <button class="btn-login font-weight-bold" @click="submit">{{ $t("send_reset_password_mail") }}</button>

              <div class="d-flex justify-content-center my-3">
                <div class="from-group">
                  <span class="btn btn-none pr-0">已經有帳號?</span>
                  <router-link class="btn btn-link pl-0" style="color: #D70042;" :to="{name: 'Login'}">
                    {{ $t('login.login') }}
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        form: {
          username: null,
          email: null,
        },
        errors: [],
      }
    },
    computed: mapGetters({
      loading: 'loading',
    }),
    methods: {
      ...mapActions({
        actionSendResetPasswordMail: 'auth/actionSendResetPasswordMail',
      }),
      submit () {
        this.actionSendResetPasswordMail({
          payload: {
            username: this.form.username,
            email: this.form.email,
          },
          context: this
        }).then(() => {
          let self = this;
          this.$swal(
            self.$t('swal.hit'),
            self.$t('swal.action') + self.$t('swal.success') + ', ' + self.$t('swal.send_mail_success'),
            'success'
          )
          this.$router.replace({ name: 'Login' })
        });
      }
    }
  }
</script>
