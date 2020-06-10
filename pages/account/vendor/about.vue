<template>
  <v-row>
    <v-col cols="auto">
      <v-card ref="about-business" class="mb-3">
        <v-card-title class="font-weight-medium">
          <v-row no-gutters>
            <v-icon left>
              mdi-office-building
            </v-icon>
            <div class="title mb-1">
              About business
            </div>
            <!-- <div class="caption tertiary--text">Manage your business gallery. All images should be in *.jpg or *.png format.</div> -->
          </v-row>
        </v-card-title>
        <v-form v-model="aboutFormValid">
          <v-row no-gutters class="pa-5">
            <v-col cols="12">
              <v-text-field
                v-model="businessName"
                outlined
                counter="30"
                label="Business name"
                hint="This is the name of your business. Your customers will identify you by this name."
                :rules="[
                  (v) => !!v || 'Business name is required',
                  (v) =>
                    (!!v && v.length <= 30) ||
                    'Business name must be at most 25 characters'
                ]"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="shortDescription"
                outlined
                counter="80"
                rows="2"
                label="Business Short Description"
                hint="Tell your customers a little ablout your business"
                :rules="[
                  (v) => !!v || 'Business short description is required',
                  (v) =>
                    (!!v && v.length <= 80) ||
                    'Short description should be at most 80 characters long'
                ]"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                outlined
                rows="3"
                label="Business Description"
                hint="Give a vivid description about your business"
                :rules="[(v) => !!v || 'Business description is required']"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                :loading="saving.about"
                :disabled="!aboutFormValid"
                color="primary"
                class="ma-0"
                @click="saveAbout()"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card ref="cover-picture" class="mb-3">
        <v-card-title class="font-weight-medium">
          <v-row no-gutters>
            <v-col cols="auto">
              <v-icon left>
                mdi-image-multiple
              </v-icon>
            </v-col>
            <v-col>
              <div class="title mb-1">
                Business graphic assets
              </div>
              <div class="caption tertiary--text">
                Manage your business gallery. All images should be in *.jpg or
                *.png format.
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row no-gutters class="pa-5">
          <v-col cols="12">
            <div class="subtitle mb-1">
              Business logo
            </div>
            <div class="caption tertiary--text">
              The logo of your business or company. It will help your customers
              recognize your brand faster.
            </div>
            <div class="caption tertiary--text">
              * Logo must be 150 x 150 pixels
            </div>
          </v-col>
          <v-col cols="12" class="mb-3">
            <v-row no-gutters class="scroll-x">
              <label for="logo-image">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-card
                      height="150px"
                      width="150px"
                      hover
                      class=""
                      v-on="on"
                    >
                      <v-img
                        v-if="logoImage"
                        :src="logoImage"
                        height="100%"
                        cover
                      />
                      <v-container v-else fill-height fluid>
                        <v-row
                          justify="center"
                          align="center"
                          class="primary--text"
                        >
                          <v-icon color="primary" size="50px">mdi-plus</v-icon>
                          Add logo
                        </v-row>
                      </v-container>
                      <v-container v-if="logoUploading" fil-height>
                        <v-row
                          justify="center"
                          align="center"
                          class="image-loader--wrapper"
                        >
                          <v-progress-circular
                            v-if="!logoUploadError"
                            indeterminate
                            color="primary"
                          />
                          <v-btn
                            v-else
                            small
                            text
                            color="primary"
                            @click.stop="saveLogo()"
                          >
                            retry
                          </v-btn>
                        </v-row>
                      </v-container>
                    </v-card>
                  </template>
                  <span>Click to upload logo</span>
                </v-tooltip>
                <input
                  id="logo-image"
                  type="file"
                  name="cover"
                  accept="image/*"
                  hidden
                  @change="uploadLogo($event)"
                />
              </label>
            </v-row>
          </v-col>

          <v-col cols="12">
            <div class="subtitle mb-1">
              Business Cover
            </div>
            <div class="caption tertiary--text">
              Attaract more customers to your page by using a cover background
            </div>
            <div class="caption tertiary--text">
              * cover must be 1000 x 2000 pixels
            </div>
          </v-col>
          <v-col cols="12" class="mb-3">
            <v-row row wrap class="scroll-x ma-0">
              <label for="cover-image">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-card height="170px" width="270px" hover v-on="on">
                      <v-img v-if="cover" :src="cover" height="100%" cover />
                      <v-container v-else fill-height class="primary--text">
                        <v-row
                          justify="center"
                          align="center"
                          class="flex-column"
                        >
                          <v-icon color="primary" size="50px">mdi-plus</v-icon>
                          <span class="caption d-block">
                            Add Cover Image
                          </span>
                        </v-row>
                      </v-container>
                      <v-container
                        v-if="coverUploading"
                        fill-height
                        class="image-loader--wrapper"
                      >
                        <v-row
                          justify="center"
                          align="center"
                          class="flex-column"
                        >
                          <v-progress-circular
                            v-if="!coverUploadError"
                            indeterminate
                            color="primary"
                          />
                          <v-btn
                            v-else
                            small
                            text
                            color="primary"
                            @click.stop="saveCover()"
                          >
                            retry
                          </v-btn>
                        </v-row>
                      </v-container>
                    </v-card>
                  </template>
                  <span>Click to upload cover picture</span>
                </v-tooltip>
                <input
                  id="cover-image"
                  type="file"
                  name="cover"
                  accept="image/*"
                  hidden
                  @change="uploadCover($event)"
                />
              </label>
            </v-row>
          </v-col>

          <v-col cols="12" class="mb-1">
            <div class="subtitle">
              Gallery
            </div>
            <div class="caption tertiary--text">
              Other pictures that showcase your business.
            </div>
            <div class="caption tertiary--text">
              Min of 2. Max of 8.
            </div>
          </v-col>
          <v-col cols="12">
            <v-row
              align="center"
              class="scroll-x ma-0"
              style="overflow-y: hidden; overflow-x: scroll;"
            >
              <v-card
                v-for="(item, index) in gallery"
                :key="index"
                height="120px"
                width="120px"
                class="mr-2 mb-2"
              >
                <v-row no-gutters style="position: relative">
                  <v-img :src="item.url" width="100%" height="100%" cover />
                  <div
                    v-if="galleryUploading[item._id]"
                    style="position: absolute; left: 0; right: 0; top: 0; bottom: 0"
                  >
                    <v-container fill-height fluid>
                      <v-row
                        no-gutters
                        align="center"
                        justify="center"
                        class="image-loader--wrapper"
                      >
                        <v-progress-circular
                          v-if="!galleryUploadError[item._id]"
                          indeterminate
                          size="30"
                          color="primary"
                        />
                        <v-btn
                          v-else
                          small
                          text
                          color="primary"
                          @click.stop="saveImage(item.id)"
                        >
                          retry
                        </v-btn>
                      </v-row>
                    </v-container>
                  </div>
                  <v-btn
                    color="white"
                    icon
                    small
                    style="position: absolute; right: 0px; top: 0px"
                    @click="deleteImage(item.id)"
                  >
                    <v-icon color="black" small>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-row>
              </v-card>

              <div v-if="gallery && gallery.length < 8">
                <label for="gallery-image">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-card
                        height="120px"
                        width="120px"
                        hover
                        class="mb-2"
                        v-on="on"
                      >
                        <v-container fill-height fluid>
                          <v-row
                            justify="center"
                            align="center"
                            class="primary--text ma-0 flex-column"
                          >
                            <v-icon color="primary" size="40px">
                              mdi-plus
                            </v-icon>
                            <span class="caption d-block">
                              Add Image
                            </span>
                          </v-row>
                        </v-container>
                      </v-card>
                    </template>
                    <span>Click to upload image</span>
                  </v-tooltip>
                  <input
                    id="gallery-image"
                    type="file"
                    name="gallery"
                    accept="image/*"
                    hidden
                    @change="addToGallery($event)"
                  />
                </label>
              </div>
            </v-row>
          </v-col>
          <v-col cols="12" pt-0>
            <div class="caption primary--text text-xs-right">
              {{ gallery && gallery.length }}/8 Added
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card ref="contact-details" class="mb-3">
        <v-card-title primary-title>
          <div class="title">
            <v-icon left>
              mdi-email
            </v-icon>
            Contact Details
          </div>
        </v-card-title>
        <v-container fluid>
          <v-form v-model="contactFormValid">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="website"
                  outlined
                  label="Web URL"
                  type="url"
                  pattern="https?://.+"
                  :rules="[(v) => urlValidation(v) || 'URL is invalid']"
                  hint="http://mycompany.com, https://mycompany.com"
                />
              </v-col>
              <v-col cols="12" md6>
                <v-text-field
                  v-model="email"
                  outlined
                  label="E-mail"
                  type="email"
                  :rules="[
                    (v) => !!v || 'E-mail is required',
                    (v) => emailValidation(v) || 'E-mail is invalid'
                  ]"
                />
              </v-col>
              <v-col cols="12" md6>
                <v-text-field
                  v-model="phone"
                  outlined
                  label="Phone"
                  :rules="[(v) => !!v || 'Phone is required']"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  :loading="saving.contact"
                  :disabled="!contactFormValid"
                  color="primary"
                  class="ma-0"
                  @click="saveContact()"
                >
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card ref="address" class="mb-3">
        <v-card-title primary-title>
          <div class="title">
            <v-icon left>
              mdi-map-marker
            </v-icon>
            Address
          </div>
        </v-card-title>
        <v-container fluid>
          <v-form v-model="locationFormValid">
            <v-row no-gutters>
              <v-col cols="12">
                <v-textarea
                  v-model="address"
                  outlined
                  rows="2"
                  label="Address"
                  :rules="[(v) => !!v || 'Address is required']"
                />
              </v-col>
              <v-col cols="12" md6>
                <v-text-field
                  v-model="city"
                  outlined
                  label="City"
                  :rules="[(v) => !!v || 'City is required']"
                />
              </v-col>
              <v-col cols="12" md6>
                <v-text-field
                  v-model="state"
                  outlined
                  label="State"
                  :rules="[(v) => !!v || 'State is required']"
                />
              </v-col>
              <v-col cols="12" md6>
                <v-autocomplete
                  v-model="country"
                  outlined
                  label="Country"
                  :items="loadCountries()"
                  :rules="[(v) => !!v || 'Country is required']"
                />
              </v-col>
              <v-col cols="12" md6>
                <v-text-field
                  v-model="postalcode"
                  outlined
                  label="Postal Code"
                />
              </v-col>
              <v-col cols="12">
                <div class="font-weight-light title text-xs-center mb-4">
                  Map Preview
                </div>
                <v-row
                  no-gutters
                  class="grey lighten-2"
                  style="height: 200px"
                />
              </v-col>
              <v-col cols="12" class="py-3">
                <v-btn
                  :loading="saving.location"
                  :disabled="!locationFormValid"
                  color="primary"
                  class="ma-0"
                  @click="saveLocation()"
                >
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-col>

    <!-- <v-card ref="update password" class="mb-3">
			<v-card-title primary-title>
				<div class="title"><v-icon left>mdi-lock</v-icon> Update password</div>
			</v-card-title>
			<v-container grid-list-md fluid>
				<v-form v-model="passwordFormValid">
					<v-row row wrap >
						<v-col cols="12" >
							<v-text-field
								v-model="oldPassword"
								outlined
								label="Old Password"
								type="password"
								:rules="[
									v => !!v || 'Password is required'
								]"
							></v-text-field>
						</v-col>
						<v-col cols="12" >
							<v-text-field
								v-model="newPassword"
								outlined
								label="New Password"
								type="password"
								:rules="[
									v => !!v || 'Password is required',
									v => v == rePassword || 'Passwords don\'t match'
								]"
							></v-text-field>
						</v-col>
						<v-col cols="12" >
							<v-text-field
								v-model="rePassword"
								outlined
								label="Confirm Password"
								type="password"
								:rules="[
									v => !!v || 'Password is required',
									v => v == newPassword || 'Passwords don\'t match'
								]"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-btn :loading="saving.password" :disabled="!passwordFormValid" color="primary" class="ma-0" @click="savePassword()">Save</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-container>
		</v-card> -->

    <!-- <v-navigation-drawer
			app
			fixed
			clipped
			floating
			right
			permanent
			stateless
			width="210px"
			class="transparent pa-3 overflow-hidden"
			value="true"
		>
			<v-row column wrap>
				<v-col cols="12">
					<div class="mb-3">
						<v-list dense class="transparent">
							<v-list-item v-for="(item, index) in tableOfContent" :key="index" :class="{active: scrollY >= item.target.$el.offsetTop && scrollY <= item.target.$el.offsetHeight + item.target.$el.offsetTop}" @click="$vuetify.goTo(item.target, tableOfContentOptions)">
								<v-list-item-content class="text-capitalize">{{ item && item.name }}</v-list-item-content>
							</v-list-item>
						</v-list>
					</div>
				</v-col>
			</v-row>
		</v-navigation-drawer> -->
  </v-row>
</template>

<script>
// import { mapGetters } from 'vuex';
import { getInitials, loadCountries } from '~/assets/js/main.js';
import { emailValidation, urlValidation } from '~/assets/js/validation';

/* eslint-disable no-prototype-builtins, no-undef, no-unused-vars */
export default {
  data() {
    return {
      tableOfContent: [],
      isUploading: false,
      logoUploading: false,
      logoUploadError: false,
      coverUploading: false,
      coverUploadError: false,
      galleryUploading: {},
      galleryUploadError: {},
      aboutFormValid: false,
      contactFormValid: false,
      locationFormValid: false,
      passwordFormValid: false,
      id: this.$store.state.user.user.vendorId,
      logoImage: this.$store.state.user.user.logo,
      cover: this.$store.state.user.user.cover,
      gallery: this.$store.state.user.user.gallery,
      businessName: this.$store.state.user.user.businessName,
      shortDescription: this.$store.state.user.user.shortDescription,
      description: this.$store.state.user.user.description,
      address: this.$store.state.user.user.businessAddress,
      city: this.$store.state.user.user.businessCity,
      state: this.$store.state.user.user.businessState,
      country: this.$store.state.user.user.businessCountry,
      postalcode: this.$store.state.user.user.businessPostalcode,
      phone: this.$store.state.user.user.businessPhone,
      email: this.$store.state.user.user.businessEmail,
      website: this.$store.state.user.user.website,
      oldPassword: null,
      newPassword: null,
      rePassword: null,
      saving: {
        about: false,
        contact: false,
        location: false,
        password: false
      }
    };
  },
  computed: {
    // ...mapGetters({
    // 	'user/'
    // })
    user() {
      return this.$store.state.user.user;
    },
    scrollY() {
      return this.$store.state.scroll.scrollY + 10;
    }
  },
  mounted() {
    const tableOfContent = [];
    for (const sects in this.$refs) {
      if (this.$refs.hasOwnProperty(sects)) {
        tableOfContent.push({
          name: sects.replace(/-/g, ' '),
          target: this.$refs[sects]
        });
      }
    }
    this.tableOfContent = tableOfContent;
  },
  methods: {
    getInitials,
    emailValidation,
    urlValidation,
    loadCountries,
    uploadLogo(e) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoImage = reader.result;
        this.saveLogo();
      };
      reader.onabort = () => {};
      // reader.error = (err) => console.log(err);

      reader.readAsDataURL(e.target.files[0]);
    },
    saveLogo() {
      this.logoUploading = true;
      this.logoUploadError = false;

      const formData = new FormData();
      const cover = document.getElementById('logo-image');
      const name = cover.files[0].name;
      formData.append('image', cover.files[0]);

      axios
        .post(`/api/upload/vendor-logo/${this.id}`, formData)
        .then((res) => {
          this.logoUploading = false;
          this.logoUploadError = false;
          this.$store.commit('snackbar/show', {
            text: 'logo uploaded successfully',
            icon: 'success'
          });
          this.$store.commit('user/setUser', {
            ...this.user,
            logo: res.data.payload
          });
        })
        .catch((err) => {
          console.log(err);
          const { response, message } = err;
          // this.coverUploading = false;
          this.logoUploadError = true;
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
            icon: 'error'
          });
        });
    },
    uploadCover(e) {
      const reader = new FileReader();
      reader.onload = () => {
        this.cover = reader.result;
        this.saveCover();
        // let output = document.getElementById('category-cover-preview');
      };
      reader.onabort = () => {};
      // reader.error = (err) => console.log(err);

      reader.readAsDataURL(e.target.files[0]);
    },
    saveCover() {
      this.coverUploading = true;
      this.coverUploadError = false;

      const formData = new FormData();
      const cover = document.getElementById('cover-image');
      const name = cover.files[0].name;
      formData.append('image', cover.files[0]);

      axios
        .post(`/api/upload/vendor-cover/${this.id}`, formData)
        .then((res) => {
          this.coverUploading = false;
          this.coverUploadError = false;
          this.$store.commit('snackbar/show', {
            text: 'cover uploaded successfully.',
            icon: 'success'
          });
          this.$store.commit('user/setUser', {
            ...this.user,
            cover: res.data.payload
          });
        })
        .catch((err) => {
          console.log(err);
          const { response, message } = err;
          // this.coverUploading = false;
          this.coverUploadError = true;
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
            icon: 'error'
          });
        });
    },
    addToGallery(e) {
      const reader = new FileReader();
      reader.onload = () => {
        const _id = new Date().getTime().toString();
        const output = document.getElementById('gallery-image').files[0];

        this.gallery = [
          ...this.gallery,
          { _id, url: reader.result, file: output }
        ];
        this.saveImage(_id);
      };
      reader.onabort = () => {};

      reader.readAsDataURL(e.target.files[0]);
    },
    saveImage(id) {
      this.galleryUploading[id] = true;
      this.galleryUploadError[id] = false;

      const imageData = this.gallery.filter((a) => a._id === id)[0];
      const formData = new FormData();
      formData.append('image', imageData.file);

      axios
        .post(`/api/upload/vendor-gallery/${this.id}`, formData)
        .then((res) => {
          if (res.data.state === 'OK') {
            this.galleryUploading[id] = false;
            this.galleryUploadError[id] = false;
            this.$store.commit('snackbar/show', {
              text: 'image added to gallery successfully.',
              icon: 'success'
            });
          } else {
            this.galleryUploading[id] = false;
            this.galleryUploadError[id] = true;
            this.$store.commit('snackbar/show', {
              text: res.data.message,
              icon: 'error'
            });
          }
        })
        .catch((err) => {
          console.log(err);
          const { response, message } = err;
          this.galleryUploadError[id] = true;
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
            icon: 'error'
          });
        });
    },
    saveAbout() {
      this.saving.about = true;
      axios
        .post('/api/vendor/set-about', {
          businessName: this.businessName,
          shortDescription: this.shortDescription,
          description: this.description
        })
        .then((res) => {
          this.saving.about = false;
          if (res.data.state === 'OK') {
            this.$store.commit('user/setUser', {
              ...this.user,
              businessName: res.data.payload.businessName,
              shortDescription: res.data.payload.shortDescription,
              description: res.data.payload.description
            });
            this.$store.commit('snackbar/show', {
              text: 'About Business updated successfully.',
              icon: 'success'
            });
          }
        })
        .catch((err) => {
          this.saving.about = false;
          console.log(err);
          const { response, message } = err;

          this.$store.commit('snackbar/show', {
            text: `${response.data.message || 'Network Error'}.`,
            icon: 'error'
          });
        });
    },
    saveContact() {
      this.saving.contact = true;
      axios
        .post('/api/vendor/set-contact', {
          phone: this.phone,
          email: this.email,
          website: this.website
        })
        .then((res) => {
          this.saving.contact = false;
          if (res.data.state === 'OK') {
            this.$store.commit('user/setUser', {
              ...this.user,
              businessPhone: res.data.payload.phone,
              businessEmail: res.data.payload.email,
              website: res.data.payload.website
            });
            this.$store.commit('snackbar/show', {
              text: 'Business contacts updated successfully.',
              icon: 'success'
            });
          }
        })
        .catch((err) => {
          this.saving.contact = false;
          console.log(err);
          const { response, message } = err;

          this.$store.commit('snackbar/show', {
            text: `${response.data.message || 'Network Error'}.`,
            icons: 'error'
          });
        });
    },
    saveLocation() {
      // TODO: process coordinates from map
      this.saving.location = true;
      axios
        .post('/api/vendor/set-address', {
          address: this.address,
          city: this.city,
          state: this.state,
          country: this.country,
          coordinates: this.coordinates,
          postalcode: this.postalcode
        })
        .then((res) => {
          this.saving.location = false;
          if (res.data.state === 'OK') {
            this.$store.commit('user/setUser', {
              ...this.user,
              businessAddress: res.data.payload.address,
              businessCity: res.data.payload.city,
              businessState: res.data.payload.state,
              businessCountry: res.data.payload.country,
              businessPostalcode: res.data.payload.postalcode,
              coordinates: res.data.payload.coordinates
            });
            this.$store.commit('snackbar/show', {
              text: 'Business location updated successfully.',
              icon: 'success'
            });
          }
        })
        .catch((err) => {
          this.saving.location = false;
          console.log(err);
          const { response, message } = err;

          this.$store.commit('snackbar/show', {
            text: `${response.data.message || 'Network Error'}.`,
            icon: 'error'
          });
        });
    },
    savePassword() {}
  }
};
</script>

<style>
.progress-wrapper {
  position: absolute;
  left: 46%;
  top: 45%;
}
</style>
