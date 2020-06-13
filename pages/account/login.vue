<template>
  <v-container fluid fill-height>
    <v-row no-gutters>
      <v-sheet width="100%">
        <v-form v-model="loginValid">
          <v-row justify="center" class="relative">
            <v-col cols="12" md="10">
              <v-row no-gutters align="center" justify="center" class="">
                Don't have an account yet?
                <v-btn
                  text
                  small
                  color="accent"
                  class="ma-0 px-2 text-capitalize"
                  :to="
                    `/account/register?redirect=${$router.history.current.query.redirect}`
                  "
                >
                  Create one
                </v-btn>
              </v-row>
            </v-col>
            <v-col cols="12" md="10">
              <v-text-field
                id="login-email"
                v-model="loginEmail"
                name="email"
                label="Your e-mail"
                type="email"
                prepend-inner-icon="mdi-account"
                outlined
                class="ma-0"
                :error="authFailed"
                :rules="[
                  (v) => !!v || 'E-mail required',
                  (v) => emailValidation(v) || 'Email is invalid',
                  (v) =>
                    !authFailed ||
                    'Wrong email. Try again or click Forgot password to reset it'
                ]"
              />
            </v-col>
            <v-col cols="12" md="10">
              <v-text-field
                id="login-password"
                v-model="loginPassword"
                name="password"
                label="Your password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                outlined
                class="ma-0"
                :error="authFailed"
                :rules="[
                  (v) => !!v || 'Password required',
                  (v) =>
                    !authFailed ||
                    'Wrong password. Try again or click Forgot password to reset it'
                ]"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col cols="12" md="10">
              <v-btn
                :disabled="!loginValid"
                :loading="processing"
                light
                block
                color="accent"
                @click="processLogin"
              >
                log in
              </v-btn>
            </v-col>
            <v-col cols="12" md="10">
              <v-btn text block color="primary">
                forgot password
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import { emailValidation } from '~/assets/js/validation';
// import axios from '~/plugins/axios';

export default {
  layout: 'user-auth',
  data() {
    return {
      some: 'rgrgr',
      loginValid: false,
      showPassword: false,
      processing: false,
      loginEmail: null,
      loginPassword: null,
      authFailed: false
    };
  },
  mounted() {},
  methods: {
    emailValidation,
    processLogin() {
      this.processing = true;

      this.$axios
        .post('/api/login', {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then((res) => {
          const { data } = res;
          this.processing = false;

          if (data.state === 'OK') {
            this.$store.commit('user/setUser', data.payload, true);
            // this.$store.commit('dialog/initLogin', false);
            this.$router.replace(this.$router.history.current.query.redirect);
          } else {
            this.authFailed = true;
            this.$store.commit('user/setUser', null, false);
            this.$store.commit('snackbar/show', {
              text: 'Invalid email or password',
              icon: 'error'
            });
          }

          this.authFailed = false;
        })
        .catch((err) => {
          this.processing = false;
          // eslint-disable-next-line no-unused-vars
          const { response, message } = err;

          if (response.status === 403) {
            this.authFailed = true;
            this.$store.commit('snackbar/show', {
              text: 'Invalid email or password',
              icon: 'error'
            });
          } else {
            this.$store.commit('snackbar/show', {
              text: 'Network error. Try again later.',
              icon: 'error'
            });
          }

          this.$store.commit('user/setUser', null, false);
          this.authFailed = false;
        });
    }
  },
  head() {
    return {
      title: 'Log in'
    };
  }
};
</script>

<style>
.auth-bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
