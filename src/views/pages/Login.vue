<template>
  <div class="container-fuild bg-dark bg-cover bg-fluid d-flex align-items-center">
    <div class="spinner" v-if="loading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
    <section class="container animated fadeIn" v-else>
      <div class="row justify-content-center">

        <div class="col-md-7 text-center my-5">
          <div>
            <c-alert></c-alert>

            <div class="alert alert-danger mt-3" v-if="errors.message">
              {{ $t('login.login_errors_message') }}
            </div>

            <form @submit.prevent>
              <b-form-group>
                <input type="text" placeholder="Username" class="form-control form-control-lg in-login" :class="{ 'is-invalid': errors.message }" v-model="form.username" @keyup.enter="submit" required>
              </b-form-group>

              <b-form-group>
                <input type="password" placeholder="Password" class="form-control form-control-lg in-login" :class="{ 'is-invalid': errors.message }" v-model="form.password" @keyup.enter="submit" required>
              </b-form-group>

              <b-form-group>
                <input type="text" :placeholder="$t('login.google_token') + ' (' + $t('login.if_enable') + ')'" class="form-control form-control-lg in-login" :class="{ 'is-invalid': errors.one_time_password }" v-model="form.one_time_password" @keyup.enter="submit">
                <span class="invalid-feedback" v-if="errors.one_time_password">
                    {{ errors.one_time_password[0] }}
                </span>
              </b-form-group>

              <button class="btn btn-block font-weight-bold" @click="onLogin">{{ $t("login.login") }}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import cAlert from '@/components/Alert';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    cAlert,
  },
  data() {
    return {
      form: {
        username: null,
        password: null,
        one_time_password: null,
      },
      errors: [],
    };
  },
  computed: ({
    ...mapGetters({
      loading: 'loading',
    }),
  }),
  methods: {
    ...mapActions({
      actionLogin: 'auth/actionLogin',
    }),
    onLogin() {
      if (this.checkbox) {
        this.actionLogin({
          payload: {
            grant_type: 'password',
            username: this.form.username,
            password: this.form.password,
            one_time_password: this.form.one_time_password,
          },
          context: this,
        }).then().then(() => {
          if (this.errors === 'Maintain') {
            this.$router.replace({ name: 'Maintain' });
          } else {
            this.$router.replace({ name: 'Home' });
          }
        });
      }
    },
  },
};
</script>
