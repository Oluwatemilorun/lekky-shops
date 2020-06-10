<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-card width="300px" height="auto" raised>
        <v-form v-model="authForm">
          <v-row dense class="ma-0 pa-3">
            <v-col cols="12">
              <img
                src="@/assets/img/logo.jpg"
                style="width: 120px"
                alt="LekkyShops"
                class="font-weight-light headline text-xs-center teal--text text--darken-1 d-block mx-auto"
              />
            </v-col>
            <v-col cols="12">
              <h3 class="text-center title font-weight-light mb-3">
                Admin Log In
              </h3>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                prepend-inner-icon="mdi-account"
                :rules="[(v) => !!v || 'Please enter your username']"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                outlined
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[(v) => !!v || 'Please enter your password']"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                :loading="loading"
                :disabled="!authForm"
                color="primary"
                large
                block
                ma-0
                @click="processLogin()"
              >
                log in
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { usernameValidation } from '~/assets/js/validation';

export default {
  layout: 'admin-login',
  data() {
    return {
      username: null,
      password: null,
      showPassword: false,
      loading: false,
      authForm: false
    };
  },
  methods: {
    usernameValidation,
    processLogin() {
      this.loading = true;
      this.$axios
        .post('/api/admin/login', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          const { data } = res;
          this.loading = false;

          if (data.state === 'OK') {
            this.$store.commit('admin/setAdmin', data.payload, true);
            // this.$store.commit('dialog/initLogin', false);
            this.$router.replace(this.$router.history.current.query.redirect);
          } else {
            this.authFailed = true;
            this.$store.commit('`admin`/setAdmin', null, false);
            this.$store.commit('snackbar/show', {
              text: 'Invalid email or password',
              icon: 'error'
            });
          }
        })
        .catch((err) => {
          this.loading = false;

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

          this.$store.commit('admin/setAdmin', null, false);
        });
    }
  }
};
</script>

<style></style>
