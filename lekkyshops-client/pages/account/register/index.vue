<template>
  <div id="register">
    <div class="title font-weight-bold py-1">Create Account</div>
    <div>
      <v-form>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="name"
              name="name"
              label="Name"
              height="50"
              prepend-inner-icon="mdi-account-outline"
              solo-inverted
              flat
              :error="authFailed"
              :rules="[(v) => !!v || 'Name is required']"
            />
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="email"
              name="email"
              label="Email"
              height="50"
              prepend-inner-icon="mdi-email-outline"
              solo-inverted
              flat
              :error="authFailed"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => emailValidation(v) || 'Email is invalid',
              ]"
            />
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              height="54"
              prepend-inner-icon="mdi-lock-outline"
              solo-inverted
              flat
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :error="authFailed"
              :rules="[
                (v) => !!v || 'Password is required',
                (v) =>
                  /^\S{8,}$/.test(v) ||
                  'Not less than 8 characters (without spaces)',
              ]"
              @click:append="showPassword = !showPassword"
            />
          </v-col>
          <v-col cols="12" class="py-0">
            <v-checkbox v-model="terms" :ripple="false">
              <template v-slot:label>
                <div>
                  I agree to the
                  <a target="_blank" href="/terms"> terms and conditions </a>
                </div>
              </template>
            </v-checkbox>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-btn
              :loading="processing"
              :disabled="!formIsValid"
              large
              block
              color="primary"
              @click="processUser"
            >
              Create Account
            </v-btn>
          </v-col>
          <v-col cols="12" class="pb-0">
            Registered already?
            <v-btn text color="primary" to="/account/login"> Sign in </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { emailValidation } from '~/utils/validation'

export default {
  layout: 'user-auth',
  data() {
    return {
      name: null,
      email: null,
      password: null,
      terms: false,
      authFailed: false,
      showPassword: false,
      processing: false,
    }
  },
  computed: {
    formIsValid() {
      return this.name && this.email && this.password && this.terms
    },
  },
  methods: {
    emailValidation,
    processUser() {
      this.processing = true

      this.$axios
        .post('/api/user/create', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.processing = false

          const { data } = res
          this.$store.commit('snackbar/show', {
            text: 'Registration was successful',
            icon: 'success',
          })
          this.$store.commit('user/setUser', data.payload, true)
          this.$router.replace(this.$router.history.current.query.redirect)
        })
        .catch((err) => {
          this.processing = false

          const { response } = err
          this.info = err.response
          if (response.status === 409) {
            this.$store.commit('snackbar/show', {
              text: response.data.message,
              icon: 'error',
            })
          } else if (response.status === 400) {
            this.$store.commit('snackbar/show', {
              text: response.data.payload,
              icon: 'error',
            })
          } else {
            this.$store.commit('snackbar/show', {
              text: 'Network error. Try again later.',
              icon: 'error',
            })
          }
        })
    },
  },
  head() {
    return {
      title: 'Get started, create an account today.',
    }
  },
}
</script>

<style>
#register .v-input--selection-controls__input {
  display: inline;
}
#register .v-input--selection-controls {
  padding-top: 0;
  margin-top: 0;
}
#register .v-input--checkbox .v-messages {
  display: none !important;
}
</style>
