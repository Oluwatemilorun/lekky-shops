<template>
  <!-- <v-fade-transition> -->
  <v-card width="100%">
    <v-toolbar light dense card>
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer />
      <v-btn text icon color="black" @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form v-model="loginValid">
      <v-layout row wrap style="position: relative" pa-4>
        <v-flex xs12>
          <v-text-field
            id="login-email"
            v-model="loginEmail"
            name="email"
            label="Your e-mail"
            type="email"
            prepend-icon="mdi-account"
            :error="authFailed"
            :rules="[
              (v) => !!v || 'E-mail required',
              (v) => emailValidation(v) || 'Email is invalid',
              (v) =>
                !authFailed ||
                'Wrong email. Try again or click Forgot password to reset it'
            ]"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
            id="login-password"
            v-model="loginPassword"
            name="password"
            label="Your password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :error="authFailed"
            :rules="[
              (v) => !!v || 'Password required',
              (v) =>
                !authFailed ||
                'Wrong password. Try again or click Forgot password to reset it'
            ]"
            @click:append="showPassword = !showPassword"
          />
        </v-flex>
        <v-flex xs12>
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
        </v-flex>
        <v-flex xs12>
          <v-btn text block color="accent">
            forgot password
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <p class="grey--text my-2 text-xs-center">
            Or connect with
          </p>
        </v-flex>
        <v-flex xs12>
          <v-btn :disabled="processing" block dark color="blue darken-2">
            <v-icon left>
              mdi-facebook
            </v-icon>
            facebook
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn :disabled="processing" block dark color="red darken-1">
            <v-icon left>
              mdi-google-plus
            </v-icon>
            Google
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn :disabled="processing" block dark color="light-blue">
            <v-icon left>
              mdi-twitter
            </v-icon>
            Twitter
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <v-card-actions class="pa-1">
      <!-- <v-btn text block color="secondary" dark nuxt to="/account/signup">Don't have an account yet? Create one.</v-btn> -->
      <v-btn
        text
        block
        color="secondary"
        dark
        nuxt
        @click="$store.commit('dialog/initSignup', true)"
      >
        Don't have an account yet? Create one.
      </v-btn>
    </v-card-actions>
  </v-card>
  <!-- </v-fade-transition> -->
</template>

<script>
// import { mapMutations } from 'vuex';
import { emailValidation } from '~/assets/js/validation';

export default {
  name: 'auth-login',
  data() {
    return {
      loginValid: false,
      showPassword: false,
      processing: false,
      loginEmail: null,
      loginPassword: null,
      authFailed: false
    };
  },
  mounted() {
    // this.$store.commit('dialog/initLogin', true);
  },
  methods: {
    emailValidation,
    close() {
      this.$store.commit('dialog/initLogin', false);
      // this.$router.back();
    },
    processLogin() {
      this.processing = true;

      this.$axios
        .post('/api/login', {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then((res) => {
          const { data } = res;

          if (data.state === 'OK') {
            this.$store.commit('user/setUser', data.payload, true);
            this.$store.commit('dialog/initLogin', false);
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
        })
        .finally(() => {
          this.processing = false;
        });
    }
  }
  // beforeRouteUpdate (to, from, next) {
  // 	this.$store.commit('dialog/initLogin', true);
  // 	next();
  // },
  // beforeRouteLeave (to, from, next) {
  // 	this.$store.commit('dialog/initLogin', false);
  // 	next();
  // }
};
</script>

<style></style>
