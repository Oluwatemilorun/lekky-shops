<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <v-toolbar color="transparent" flat>
        <v-toolbar-title class="headline"> Change Password </v-toolbar-title>
      </v-toolbar>
      <v-card ref="update password" class="mb-3" flat>
        <v-container grid-list-md fluid>
          <v-form v-model="passwordFormValid">
            <v-row row wrap>
              <v-col cols="12">
                <v-text-field
                  v-model="oldPassword"
                  outlined
                  label="Old Password"
                  type="password"
                  :rules="[(v) => !!v || 'Password is required']"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newPassword"
                  outlined
                  label="New Password"
                  type="password"
                  :rules="[
                    (v) => !!v || 'Password is required',
                    (v) => v == rePassword || 'Passwords don\'t match',
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="rePassword"
                  outlined
                  label="Confirm Password"
                  type="password"
                  :rules="[
                    (v) => !!v || 'Password is required',
                    (v) => v == newPassword || 'Passwords don\'t match',
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  :loading="saving.password"
                  :disabled="!passwordFormValid"
                  color="primary"
                  class="ma-0 text-capitalize"
                  @click="savePassword()"
                >
                  Change Pasword
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    passwordFormValid: false,
    oldPassword: null,
    newPassword: null,
    rePassword: null,
    saving: {
      about: false,
      contact: false,
      location: false,
      password: false,
    },
  }),
  methods: {
    savePassword() {
      this.saving.password = true
      this.$axios
        .post('/api/user/set-password', {
          password: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then((res) => {
          this.saving.password = false
          // if (res.data.state == 'OK') {
          // 	this.$store.commit('user/setUser', { ...this.user, businessName: res.data.payload.businessName, description: res.data.payload.description })
          // }
        })
        .catch((err) => {
          this.saving.password = false
          // eslint-disable-next-line no-unused-vars
          const { response, message } = err

          this.$store.commit(
            'snackbar/show',
            `${response.data.payload || 'Network Error'}.`
          )
        })
    },
  },
}
</script>

<style></style>
