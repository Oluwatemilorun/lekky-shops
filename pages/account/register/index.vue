<template>
  <v-container fluid fill-height>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row no-gutters align="center" justify="center" class="text-center">
          Already signed up?
          <v-btn
            text
            small
            color="accent"
            class="ma-0 px-2 text-capitalize"
            :to="
              `/account/login?redirect=${$router.history.current.query.redirect}`
            "
          >
            Log in
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-stepper v-model="e1" alt-labels class="elevation-0">
          <v-stepper-header class="elevation-0">
            <v-stepper-step class="pa-3" step="1" :complete="e1 > 1">
              Account
            </v-stepper-step>

            <v-divider />

            <v-stepper-step class="pa-3" step="2" :complete="e1 > 2">
              Pick interests
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1" class="py-0">
              <v-form v-model="userFormValid">
                <v-row no-gutters class="relative mt-5">
                  <v-col cols="12">
                    <v-text-field
                      id="login-email"
                      v-model="userFullname"
                      name="fullname"
                      label="Your Fullname"
                      outlined
                      prepend-inner-icon="mdi-account-card-details"
                      :error="authFailed"
                      :rules="[(v) => !!v || 'Fullname is required']"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      id="login-email"
                      v-model="userEmail"
                      name="email"
                      label="Your e-mail"
                      outlined
                      prepend-inner-icon="mdi-account"
                      :error="authFailed"
                      :rules="[
                        (v) => !!v || 'Email is required',
                        (v) => emailValidation(v) || 'Email is invalid'
                      ]"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      id="login-password"
                      v-model="userPassword"
                      name="password"
                      label="Your password"
                      outlined
                      prepend-inner-icon="mdi-lock"
                      type="password"
                      :error="authFailed"
                      :rules="[
                        (v) => !!v || 'Password is required',
                        (v) =>
                          (!!v && v.length >= 8) ||
                          'Password must be more than 8 characters'
                      ]"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      id="login-password-2"
                      v-model="userPassword2"
                      name="password"
                      label="Re-type password"
                      outlined
                      prepend-inner-icon="mdi-lock"
                      type="password"
                      :error="authFailed"
                      :rules="[
                        (v) => !!v || 'Passwords don\'t match',
                        (v) => v == userPassword || 'Passwords don\'t match'
                      ]"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox v-model="userTAndC">
                      <template v-slot:label>
                        <div>
                          I have read and agree to the
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <a target="_blank" href="" @click.stop v-on="on">
                                terms and conditions
                              </a>
                            </template>
                            Open terms and conditions in new window
                          </v-tooltip>
                        </div>
                      </template>
                    </v-checkbox>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      :loading="processingUser"
                      :disabled="!userFormValid || !userTAndC"
                      light
                      block
                      color="accent"
                      @click="processUser(1)"
                    >
                      save and continue
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-row justify-space-between style="position: relative" ma-0>
                <v-col cols="12">
                  <div class="text-xs-center mb-3 title text-capitalize">
                    Pick your interests
                  </div>
                </v-col>
                <InterestSelect
                  v-for="(item, index) in categories"
                  :key="index"
                  :item="item"
                  @add="updateInterest"
                  @remove="updateInterest"
                />
                <v-col cols="12">
                  <v-btn
                    :loading="processingUser"
                    :disabled="interest.length == 0"
                    light
                    block
                    color="accent"
                    @click="processUser(2)"
                  >
                    save
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row justify-center style="position: relative" px-4>
                <div>
                  <v-avatar size="100" class="d-block mx-auto">
                    <v-icon size="100" color="primary">
                      mdi-check
                    </v-icon>
                  </v-avatar>
                  <div class="text-xs-center display-1 font-weight-light mt-3">
                    Account Created Successfully
                  </div>
                  <div class="text-xs-center my-4">
                    Please verify your e-mail address.
                  </div>
                </div>
                <v-col cols="12">
                  <v-btn
                    light
                    block
                    color="accent"
                    @click="
                      $router.replace(
                        `${$router.history.current.query.redirect}`
                      )
                    "
                  >
                    finish
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { emailValidation, usernameValidation } from '~/assets/js/validation';
import { loadCountries } from '~/assets/js/main';

import InterestSelect from '~/components/_parts/InterestSelect';

/* eslint-disable no-case-declarations, no-unused-vars */
export default {
  layout: 'user-auth',
  components: { InterestSelect },
  data() {
    return {
      e1: 1,
      isSelected: false,
      authFailed: false,
      interest: [],
      // categories: [],
      processingUser: false,
      processingVendor: false,
      userFormValid: false,
      userTAndC: false,
      userFullname: null,
      userEmail: null,
      userPassword: null,
      userPassword2: null,
      vendorTAndC: false,
      vendorName: null,
      vendorEmail: null,
      vendorPassword: null,
      companyName: null,
      companyPhone: null,
      companyCountry: null,
      companyAddress: null,
      companyUsername: null,
      companyCategory: null,
      companyPackage: null,
      vendorForm1: false,
      vendorForm2: false,
      coverImage: null,
      isUploading: false
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    },
    formatedCategories() {
      const categories = this.categories;
      let formated = [];
      for (let i = 0; i < categories.length; i++) {
        const catg = categories[i];
        const entry = { header: catg.name };
        if (catg.subs) {
          const subs = catg.subs.map((a, i) => {
            return { name: a, category: catg.name, avatar: catg.cover };
          });
          formated.push(entry);
          formated = [...formated, ...subs];
        } else {
          formated.push(entry);
          continue;
        }
      }
      // console.log(formated);
      return formated;
    }
  },
  methods: {
    emailValidation,
    loadCountries,
    usernameValidation,
    updateInterest(item, type) {
      if (type === 'add') this.interest.push(item);
      else if (type === 'remove')
        this.interest = this.interest.filter((a) => a !== item);
      else {
      }
    },
    async processUser(step) {
      try {
        this.processingUser = true;
        switch (step) {
          case 1:
            const { data } = await this.$axios.post('/api/user/create', {
              name: this.userFullname,
              email: this.userEmail,
              password: this.userPassword
            });

            this.processingUser = false;
            if (data.state === 'OK') {
              this.$store.commit('user/setUser', data.payload, true);
              this.e1 = 2;
            } else if (data.state === 'NO') {
              this.authFailed = true;
              this.$store.commit('snackbar/show', {
                text: data.message,
                icon: 'error'
              });
              this.$store.commit('user/setUser', null, false);
            }
            break;
          case 2:
            if (this.interest.length === 0) {
              this.$store.commit('snackbar/show', {
                text: 'Please select an interest.',
                icon: 'warning'
              });
              return;
            }

            this.processingUser = true;
            const res = await this.$axios.post('/api/user/interest/add', {
              interest: this.interest
            });

            if (res.data.state === 'OK') {
              this.e1 = 3;
              // this.$store.commit('dialog/initSignup', false);
            } else {
              this.$store.commit('snackbar/show', {
                text: data.message,
                icon: 'error'
              });
            }
            break;

          default:
            break;
        }

        this.authFailed = false;
      } catch (err) {
        this.processingUser = false;
        const { response, message } = err;

        if (response.status === 400) {
          this.$store.commit('snackbar/show', {
            text: `Some fields are missing. ${response.data.payload}.`,
            icon: 'error'
          });
        } else if (response.status === 409) {
          this.$store.commit('snackbar/show', {
            text: response.data.payload,
            icon: 'error'
          });
        } else {
          this.$store.commit('snackbar/show', {
            text: 'Network error. Try again later.',
            icon: 'error'
          });
        }

        this.$store.commit('user/setUser', null, false);
      }
    }
  },
  head() {
    return {
      title: 'Get started, create an account today.'
    };
  }
};
</script>

<style></style>
