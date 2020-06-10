<template>
  <v-container grid-list-sm>
    <v-layout row wrap fill-height align-content-center justify-center>
      <div class="mt-4">
        <img
          src="~/assets/img/logo.jpg"
          alt="CARTTS"
          height="36px"
          class="mb-2 d-block mx-auto"
        />
        <div class="d-flex align-center">
          Already signed up?
          <v-btn
            text
            small
            color="primary"
            class="ma-0 pa-0 text-capitalize"
            :to="
              `/account/login?redirect=${$router.history.current.query.redirect}`
            "
          >
            log in.
          </v-btn>
        </div>
      </div>
      <v-flex xs12>
        <v-layout row wrap>
          <v-stepper v-model="e2" alt-labels class="elevation-0">
            <v-stepper-header class="elevation-0">
              <v-stepper-step class="pa-3" step="1" :complete="e2 > 1">
                Account
              </v-stepper-step>

              <v-divider />

              <v-stepper-step class="pa-3" step="2" :complete="e2 > 2">
                About Business
              </v-stepper-step>

              <v-divider />

              <v-stepper-step class="pa-3" step="3" :complete="e2 > 3">
                Gallery
              </v-stepper-step>
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
                        hint="The name of your business or company"
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
                        hint="The phone number your customers can contact you with"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        id="vendor-company-address"
                        v-model="companyAddress"
                        name="address"
                        label="Company address"
                        prepend-icon="mdi-map-marker"
                        :error="authFailed"
                        rows="2"
                        counter
                        maxlength="200"
                        :rules="[(v) => !!v || 'Company address is required']"
                        hint="Where your business or company is located"
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
                        hint="The country your business or company is located"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="vendor-company-username"
                        v-model="companyUsername"
                        name="username"
                        label="Cartts Username"
                        prepend-icon="mdi-web"
                        :error="authFailed"
                        :rules="[
                          (v) => !!v || 'Username is required',
                          (v) =>
                            usernameValidation(v) ||
                            'Username can only contain alphanumeric characters. (a-z A-Z 0-9)'
                        ]"
                        suffix=".cartts.com"
                        hint="Customers will access and view your page using the username"
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
                        hint="Your services will be sorted into the selected category"
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
                        save and continue
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-layout row wrap>
                  <v-flex xs12 mb-3>
                    <div
                      class="font-weight-light text-xs-center text-capitalize title"
                    >
                      Add business cover photo
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-card height="250px" color="grey lighten-3" flat>
                      <div v-if="isUploading" class="progress-wrapper">
                        <v-progress-circular indeterminate color="primary" />
                      </div>
                      <label for="cover-image">
                        <v-tooltip bottom>
                          <img
                            slot="activator"
                            :src="coverImage || `/img/upload.png`"
                            width="100%"
                            height="100%"
                          />
                          <!-- <img id="category-cover-preview" slot="activator" src="@/assets/images/upload.png" alt="cover" style="width: 100%; height: 200px"> -->
                          <span>Upload cover photo</span>
                        </v-tooltip>
                        <input
                          id="cover-image"
                          type="file"
                          name="cover"
                          accept="image/*"
                          hidden
                          @change="previewCover($event)"
                        />
                      </label>
                    </v-card>
                  </v-flex>
                  <v-flex align-content-end>
                    <v-btn text color="primary" @click="e2 = 4">
                      Skip
                    </v-btn>
                    <v-btn
                      color="primary"
                      :loading="isUploading"
                      :disabled="!!!coverImage"
                      @click="uploadCover"
                    >
                      Save and continue
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>

              <v-stepper-content step="4">
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
                      class="text-xs-center display-1 font-weight-light mt-3 px-3"
                    >
                      Vendor Account Created Successfully
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
                      @click="$router.replace(`/account/vendor/about`)"
                    >
                      go to profile
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { emailValidation, usernameValidation } from '~/assets/js/validation';
import { loadCountries } from '~/assets/js/main';

// import InterestSelect from '~/components/_parts/InterestSelect';
/* eslint-disable no-case-declarations, no-unused-vars */
export default {
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
              businessName: this.companyName,
              address: this.companyAddress,
              phone: this.companyPhone,
              country: this.companyCountry,
              category: this.companyCategory,
              package: this.companyPackage,
              username: this.companyUsername
            });

            this.processingVendor = false;
            if (res.data.state === 'OK') {
              this.e2 = 3;
            } else if (data.state === 'NO') {
              this.authFailed = true;
              this.$store.commit('snackbar/show', data.payload);
              // this.$store.commit('user/setUser', null, false);
            }
        }

        this.authFailed = false;
      } catch (err) {
        this.processingVendor = false;
        const { response, message } = err;

        if (response.status === 400) {
          this.$store.commit(
            'snackbar/show',
            `Some fields are missing. ${response.data.payload}.`
          );
        } else if (response.status === 409) {
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
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
    previewCover(e) {
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImage = reader.result;
        const output = document.getElementById('category-cover-preview');
      };
      reader.readAsDataURL(e.target.files[0]);
      // this.uploadSuccess = false;
    },
    async uploadCover() {
      this.isUploading = true;
      try {
        const formData = new FormData();
        const cover = document.getElementById('cover-image');
        const name = cover.files[0].name;
        formData.append('file', cover.files[0]);
        formData.append('test_string', 'this string shows');
        formData.append('path', 'vendor/');

        await this.$axios.post(
          'https://bucket.rainbowhub.co/cp/upload.php',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        await this.$axios.post('/api/vendor/set-cover', {
          cover: `https://bucket.rainbowhub.co/cp/vendor/${name}`
        });

        this.isUploading = false;

        this.e2 = 4;
      } catch (error) {
        console.log(error);

        this.isUploading = false;
        this.uploadSuccess = false;
        this.$store.commit('snackbar/show', {
          text: 'Error processing image. Connection error',
          icon: 'error'
        });
      }
    }
  },
  head() {
    return {
      title: 'Create Vendor Account'
    };
  }
};
</script>

<style></style>
