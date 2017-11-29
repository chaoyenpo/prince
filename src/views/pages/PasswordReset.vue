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
                <input type="password" placeholder="Password" class=" form-control form-control-lg in-login" :class="{ 'is-invalid': errors.password }" v-model="form.password" @keyup.enter="submit" required>
                <span class="invalid-feedback" v-if="errors.password">
                  {{ errors.password[0] }}
                </span>
              </b-form-group>
              <b-form-group>
                <input type="password" placeholder="Password Confirm" class=" form-control form-control-lg in-login" :class="{ 'is-invalid': errors.password }" v-model="form.password_confirmation" @keyup.enter="submit" required>
                <span class="invalid-feedback" v-if="errors.password_confirmation">
                  {{ errors.password_confirmation[0] }}
                </span>
              </b-form-group>

              <button class="btn-login font-weight-bold" @click="submit">{{ $t("reset_password") }}</button>

              <div class="d-flex flex-column justify-content-center my-3">
                <div>
                  <span class="btn btn-none pr-0">已經有帳號?</span>
                  <router-link class="btn btn-link pl-0" style="color: #D70042;" :to="{name: 'Login'}">
                    {{ $t('login.login') }}
                  </router-link>
                </div>
                <div>
                  <span class="btn btn-none pr-0">重新寄送重置密碼信?</span>
                  <router-link class="btn btn-link px-0 font-weight-bold" style="color: #D70042;" :to="{name: 'Forgot Password'}">
                    {{ $t("get_new_password") }}
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
          password: null,
          password_confirmation: null,
        },
        errors: [],
      }
    },
    computed: mapGetters({
      loading: 'loading',
    }),
    mounted() {
      console.log(this.$route.params)
    },
    methods: {
      ...mapActions({
        actionResetPassword: 'auth/actionResetPassword',
      }),
      submit () {
        this.actionResetPassword({
          payload: {
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
            user_id: this.$route.params.user_id,
            token: this.$route.params.token,
          },
          context: this
        }).then(() => {
          let self = this;
          this.$swal(
            self.$t('swal.hit'),
            self.$t('swal.action') + self.$t('swal.success'),
            'success'
          )
          this.$router.replace({ name: 'Login' })
        });
      }
    }
  }
</script>
