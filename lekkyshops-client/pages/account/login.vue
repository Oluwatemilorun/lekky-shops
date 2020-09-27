<template>
  <div>
    <div class="title font-weight-bold py-3">Login</div>
    <v-form>
      <v-row>
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="login.email"
            name="email"
            label="Email"
            type="email"
            height="50"
            solo-inverted
            flat
            prepend-inner-icon="mdi-email-outline"
            :error="authFailed"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) =>
                !authFailed ||
                'Wrong email. Try again or click Forgot password to reset it',
            ]"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="login.password"
            name="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            height="50"
            solo-inverted
            flat
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-inner-icon="mdi-lock-outline"
            :error="authFailed"
            :rules="[
              (v) => !!v || 'Password is required',
              !authFailed ||
                'Wrong password. Try again or click Forgot password to reset it',
            ]"
            @click:append="showPassword = !showPassword"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-btn
            text
            color="primary"
            class="subtitle-2"
            style="text-transform: none"
          >
            Forgot your password?
          </v-btn>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-btn
            block
            color="primary"
            large
            :loading="processing"
            :disabled="!formIsValid"
            @click="processLogin"
          >
            sign in
          </v-btn>
        </v-col>
        <v-col cols="12">
          <div>
            Don't have an account?
            <v-btn text color="primary" to="/account/register">
              Register now
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: 'user-auth',
  data() {
    return {
      login: {
        email: null,
        password: null,
      },
      authFailed: false,
      showPassword: false,
      processing: false,
    }
  },
  computed: {
    formIsValid() {
      return this.login.email && this.login.password
    },
  },
  methods: {
    processLogin() {
      this.processing = true

      this.$axios
        .post('/api/login', {
          email: this.login.email,
          password: this.login.password,
        })
        .then((res) => {
          const { data } = res
          this.processing = false

          if (data.state === 'OK') {
            this.$store.commit('user/setUser', data.payload, true)
            // this.$store.commit('dialog/initLogin', false);
            this.$router.replace(this.$router.history.current.query.redirect)
          } else {
            this.authFailed = true
            this.$store.commit('user/setUser', null, false)
            this.$store.commit('snackbar/show', {
              text: 'Invalid email or password',
              icon: 'error',
            })
          }

          this.authFailed = false
        })
        .catch((err) => {
          this.processing = false
          // eslint-disable-next-line no-unused-vars
          const { response, message } = err

          if (response.status === 403) {
            this.authFailed = true
            this.$store.commit('snackbar/show', {
              text: 'Invalid email or password',
              icon: 'error',
            })
          } else {
            this.$store.commit('snackbar/show', {
              text: 'Network error. Try again later.',
              icon: 'error',
            })
          }

          this.$store.commit('user/setUser', null, false)
          this.authFailed = false
        })
    },
  },
  head() {
    return {
      title: 'Log in',
    }
  },
}
</script>

<style>
.auth-bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.social-btn {
  border: 1px solid #ccc;
  border-radius: 50%;
}
</style>
