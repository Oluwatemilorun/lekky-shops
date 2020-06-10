<template>
  <v-fade-transition>
    <v-card width="100%" height="100%">
      <v-toolbar dense extended tabs card>
        <v-toolbar-title>Create account</v-toolbar-title>
        <v-spacer />
        <v-btn text icon color="black" @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-tabs
          slot="extension"
          v-model="authTab"
          color="transparent"
          slider-color="primary"
          style="margin: 0;"
          grow
        >
          <v-tab href="#user-account-tab">
            user account
          </v-tab>
          <v-tab href="#vendor-account-tab">
            vendor account
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="authTab">
        <v-tab-item value="user-account-tab">
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
                  <v-layout row wrap style="position: relative" px-4>
                    <v-flex xs12>
                      <v-text-field
                        id="login-email"
                        v-model="userFullname"
                        name="fullname"
                        label="Your Fullname"
                        prepend-icon="mdi-account-card-details"
                        :error="authFailed"
                        :rules="[(v) => !!v || 'Fullname is required']"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="login-email"
                        v-model="userEmail"
                        name="email"
                        label="Your e-mail"
                        prepend-icon="mdi-account"
                        :error="authFailed"
                        :rules="[
                          (v) => !!v || 'Email is required',
                          (v) => emailValidation(v) || 'Email is invalid'
                        ]"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="login-password"
                        v-model="userPassword"
                        name="password"
                        label="Your password"
                        prepend-icon="mdi-lock"
                        type="password"
                        :error="authFailed"
                        :rules="[
                          (v) => !!v || 'Password is required',
                          (v) =>
                            (!!v && v.length >= 8) ||
                            'Password must be more than 8 characters'
                        ]"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="login-password-2"
                        v-model="userPassword2"
                        name="password"
                        label="Re-type password"
                        prepend-icon="mdi-lock"
                        type="password"
                        :error="authFailed"
                        :rules="[
                          (v) => !!v || 'Passwords don\'t match',
                          (v) => v == userPassword || 'Passwords don\'t match'
                        ]"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-checkbox v-model="userTAndC">
                        <template v-slot:label>
                          <div>
                            I have read and agree to the
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <a
                                  target="_blank"
                                  href=""
                                  @click.stop
                                  v-on="on"
                                >
                                  terms and conditions
                                </a>
                              </template>
                              Open terms and conditions in new window
                            </v-tooltip>
                          </div>
                        </template>
                      </v-checkbox>
                    </v-flex>
                    <v-flex xs12>
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
                    </v-flex>
                    <v-flex xs12>
                      <p class="grey--text my-2 text-xs-center">
                        Or connect with
                      </p>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn block dark color="blue darken-1">
                        <v-icon left>
                          mdi-facebook
                        </v-icon>
                        facebook
                      </v-btn>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn block dark color="red darken-1">
                        <v-icon left>
                          mdi-google-plus
                        </v-icon>
                        Google
                      </v-btn>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn block dark color="light-blue">
                        <v-icon left>
                          mdi-twitter
                        </v-icon>
                        Twitter
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-layout
                  justify-space-between
                  row
                  wrap
                  style="position: relative"
                  px-4
                >
                  <InterestSelect
                    v-for="(item, index) in categories"
                    :key="index"
                    :item="item"
                    @add="updateInterest"
                    @remove="updateInterest"
                  />
                  <v-flex xs12>
                    <v-btn
                      :loading="processingUser"
                      :disabled="interest.length == 0"
                      light
                      block
                      color="accent"
                    >
                      save
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-layout
                  justify-center
                  row
                  wrap
                  style="position: relative"
                  px-4
                >
                  <div>
                    <v-avatar size="100" class="d-block mx-auto">
                      <v-icon size="100" color="primary">
                        mdi-check
                      </v-icon>
                    </v-avatar>
                    <div
                      class="text-xs-center display-1 font-weight-light mt-3"
                    >
                      Account Created Successfully
                    </div>
                    <div class="text-xs-center my-4">
                      Please verify your e-mail address.
                    </div>
                  </div>
                  <v-flex xs12>
                    <v-btn
                      light
                      block
                      color="accent"
                      @click="$store.commit('dialog/initSignup', false)"
                    >
                      exit
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-tab-item>
        <v-tab-item value="vendor-account-tab">
          <v-stepper v-model="e2" alt-labels class="elevation-0">
            <v-stepper-header class="elevation-0">
              <v-stepper-step class="pa-3" step="1" :complete="e2 > 1">
                Account
              </v-stepper-step>

              <v-divider />

              <v-stepper-step class="pa-3" step="2" :complete="e2 > 2">
                About Business
              </v-stepper-step>

              <!-- <v-divider></v-divider>

							<v-stepper-step class="pa-3" step="3" :complete="e1 > 3">Add Service</v-stepper-step> -->
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1" class="py-0">
                <v-form v-model="vendorForm1">
                  <v-layout row wrap style="position: relative" px-4>
                    <v-flex xs12>
                      <v-text-field
                        id="vendor-fullname"
                        v-model="vendorName"
                        label="Your Fullname"
                        prepend-icon="mdi-account-card-details"
                        :error="authFailed"
                        :rules="[(v) => !!v || 'Fullname is required']"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="vendor-email"
                        v-model="vendorEmail"
                        label="Your e-mail"
                        prepend-icon="mdi-account"
                        type="email"
                        :error="authFailed"
                        :rules="[
                          (v) => !!v || 'Email is required',
                          (v) => emailValidation(v) || 'Email is invalid'
                        ]"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="vendor-password"
                        v-model="vendorPassword"
                        label="Your password"
                        prepend-icon="mdi-lock"
                        type="password"
                        :error="authFailed"
                        :rules="[
                          (v) => !!v || 'Password is required',
                          (v) =>
                            (!!v && v.length >= 8) ||
                            'Password must be more than 8 characters'
                        ]"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="vendor-password-2"
                        label="Re-type password"
                        prepend-icon="mdi-lock"
                        type="password"
                        :error="authFailed"
                        :rules="[
                          (v) => !!v || 'Passwords don\'t match',
                          (v) => v == vendorPassword || 'Passwords don\'t match'
                        ]"
                      />
                    </v-flex>
                    <v-checkbox v-model="vendorTAndC">
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
                    <v-flex xs12>
                      <v-btn
                        :loading="processingVendor"
                        :disabled="!vendorForm1 || !vendorTAndC"
                        light
                        block
                        color="accent"
                        @click="processVendor(1)"
                      >
                        save and continue
                      </v-btn>
                    </v-flex>
                    <v-flex xs12>
                      <p class="grey--text my-2 text-xs-center">
                        Or connect with
                      </p>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn block dark color="blue darken-1">
                        <v-icon left>
                          mdi-facebook
                        </v-icon>
                        facebook
                      </v-btn>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn block dark color="red darken-1">
                        <v-icon left>
                          mdi-google-plus
                        </v-icon>
                        Google
                      </v-btn>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn block dark color="light-blue">
                        <v-icon left>
                          mdi-twitter
                        </v-icon>
                        Twitter
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-form v-model="vendorForm2">
                  <v-layout row wrap px-4>
                    <v-flex xs12>
                      <v-text-field
                        id="vendor-company-name"
                        v-model="companyName"
                        name="name"
                        label="Company Name"
                        prepend-icon="mdi-office-building"
                        :error="authFailed"
                        :rules="[(v) => !!v || 'Company name is required']"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="vendor-company-phone"
                        v-model="companyPhone"
                        name="phone"
                        label="Phone no."
                        prepend-icon="mdi-phone"
                        :error="authFailed"
                        :rules="[(v) => !!v || 'Phone is required']"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="vendor-company-address"
                        v-model="companyAddress"
                        name="address"
                        label="Company address"
                        prepend-icon="mdi-map-marker"
                        :error="authFailed"
                        :rules="[(v) => !!v || 'Company address is required']"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-autocomplete
                        v-model="companyCountry"
                        name="country"
                        :items="loadCountries()"
                        label="Country business is based"
                        prepend-icon="mdi-map"
                        :error="authFailed"
                        :rules="[(v) => !!v || 'Country is required']"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-autocomplete
                        v-model="companyCategory"
                        :items="formatedCategories"
                        label="Select category / interest"
                        prepend-icon="mdi-album"
                        :error="authFailed"
                        item-text="name"
                        item-value="name"
                        :rules="[(v) => !!v || 'Please select category']"
                      >
                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-item-content
                              class="accent--text text-capitalize caption"
                              v-text="data.item"
                            >
                              <span class="">{{ data.item }}</span>
                            </v-list-item-content>
                          </template>
                          <template v-else>
                            <v-list-item-content>
                              <v-list-item-title
                                class="text-capitalize font-weigh black--text"
                              >
                                {{ data.item.name }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-select
                        v-model="companyPackage"
                        :items="[
                          'cartts trial',
                          'service starter',
                          'service professional',
                          'annual unlimited'
                        ]"
                        label="Select package"
                        prepend-icon="mdi-apps"
                        :error="authFailed"
                        :rules="[(v) => !!v || 'Please select a package']"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-btn
                        :loading="processingVendor"
                        :disabled="!vendorForm2"
                        light
                        block
                        color="accent"
                        @click="processVendor(2)"
                      >
                        save
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-layout
                  justify-center
                  row
                  wrap
                  style="position: relative"
                  px-4
                >
                  <div>
                    <v-avatar size="100" class="d-block mx-auto">
                      <v-icon size="100" color="primary">
                        mdi-check
                      </v-icon>
                    </v-avatar>
                    <div
                      class="text-xs-center display-1 font-weight-light mt-3"
                    >
                      Vendor Account Created Successfully
                    </div>
                    <div class="text-xs-center my-4">
                      Please verify your e-mail address.
                    </div>
                  </div>
                  <v-flex xs12>
                    <v-btn light block color="accent" to="/account/profile">
                      go to profile
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-tab-item>
      </v-tabs-items>

      <v-card-actions class="pa-1">
        <!-- <v-btn text block color="secondary" dark nuxt to="/account/login">Don't have an account yet? Create one.</v-btn> -->
        <v-btn
          text
          block
          color="secondary"
          dark
          nuxt
          @click="$store.commit('dialog/initLogin', true)"
        >
          Don't have an account yet? Create one.
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-fade-transition>
</template>

<script>
import { emailValidation } from '~/assets/js/validation';
import { loadCountries } from '~/assets/js/main';

import InterestSelect from '~/components/_parts/InterestSelect';

/* eslint-disable no-unused-vars, no-case-declarations */

export default {
  name: 'auth-signup',
  components: { InterestSelect },
  // async asyncData () {

  // },
  data() {
    return {
      authTab: 'user-account-tab',
      e1: 1,
      e2: 1,
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
      companyCategory: null,
      companyPackage: null,
      vendorForm1: false,
      vendorForm2: false
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
  mounted() {
    // this.$store.commit('dialog/initSignup', true);
    // this.$axios.get('/api/categories')
    // 	.then(({data}) => {
    // 		return {
    // 			categories: data.payload
    // 		}
    // 	})
    // 	.catch(err => {
    // 		console.log(err);
    // 	});
  },
  methods: {
    emailValidation,
    loadCountries,
    close() {
      this.$store.commit('dialog/initSignup', false);
      // this.$router.back();
    },
    updateInterest(item, type) {
      if (type === 'add') {
        this.interest.push(item);
      } else if (type === 'remove') {
        this.interest = this.interest.filter((a) => a !== item);
      } else {
        return {};
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
              this.$store.commit('snackbar/show', data.payload);
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
            text: 'Missing important.',
            icon: 'error'
          });
        } else if (response.status === 409) {
          this.$store.commit('snackbar/show', {
            text: 'Email already exist.',
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
    },
    async processVendor(step) {
      try {
        this.processingVendor = true;
        switch (step) {
          case 1:
            const { data } = await this.$axios.post('/api/vendor/create', {
              name: this.vendorName,
              email: this.vendorEmail,
              password: this.vendorPassword
            });

            this.processingVendor = false;
            if (data.state === 'OK') {
              this.$store.commit('user/setUser', data.payload, true);
              this.e2 = 2;
            } else if (data.state === 'NO') {
              this.authFailed = true;
              this.$store.commit('snackbar/show', data.payload);
              this.$store.commit('user/setUser', null, false);
            }
            break;
          case 2:
            const res = await this.$axios.post('/api/vendor/set-details', {
              business_name: this.companyName,
              address: this.companyAddress,
              phone: this.companyPhone,
              country: this.companyCountry,
              category: this.companyCategory,
              package: this.companyPackage
            });
        }

        this.authFailed = false;
      } catch (err) {
        this.processingVendor = false;
        const { response, message } = err;

        if (response.status === 400) {
          this.$store.commit('snackbar/show', 'Missing important.');
        } else if (response.status === 409) {
          this.$store.commit('snackbar/show', 'Email already exist.');
        } else {
          this.$store.commit('snackbar/show', {
            text: 'Network error. Try again later.',
            icon: 'error'
          });
        }

        this.$store.commit('user/setUser', null, false);
      }
    }
  }
  // beforeRouteUpdate (to, from, next) {
  // 	this.$store.commit('dialog/initSignup', true);
  // 	next();
  // },
  // beforeRouteLeave (to, from, next) {
  // 	this.$store.commit('dialog/initSignup', false);
  // 	next();
  // }
};
</script>

<style>
.catg-card {
  position: relative;
}
.catg-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.v-select-list .v-subheader {
  text-transform: capitalize;
  font-weight: 500;
}
</style>
