<template>
  <v-row>
    <v-col cols="12">
      <v-card ref="profile-picture" class="mb-3">
        <v-card-title primary-title>
          <div class="title">
            Profile Picture
          </div>
        </v-card-title>
        <v-row no-gutters>
          <v-col cols="12" class="ma-3">
            <v-row no-gutters class="scroll-x">
              <label for="profile-image">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-card
                      height="150px"
                      width="150px"
                      hover
                      class=""
                      v-on="on"
                    >
                      <v-img v-if="user && user.avatar" :src="user.avatar" />
                      <v-container v-else fill-height fluid>
                        <v-row
                          justify="center"
                          align="center"
                          class="primary--text"
                        >
                          {{ getInitials(user.name) }}
                        </v-row>
                      </v-container>
                      <v-container v-if="profileUploading" fil-height>
                        <v-row
                          justify="center"
                          align="center"
                          class="image-loader--wrapper"
                        >
                          <v-progress-circular
                            v-if="!profileUploadError"
                            indeterminate
                            color="primary"
                          />
                          <v-btn
                            v-else
                            small
                            text
                            color="primary"
                            @click.stop="saveProfilePhoto()"
                          >
                            retry
                          </v-btn>
                        </v-row>
                      </v-container>
                    </v-card>
                  </template>
                  <span>Click to upload profile photo</span>
                </v-tooltip>
                <input
                  id="profile-image"
                  type="file"
                  name="cover"
                  accept="image/*"
                  hidden
                  @change="uploadProfilePhoto($event)"
                />
              </label>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card ref="about-me" class="mb-3">
        <v-card-title primary-title>
          <div class="title">
            <v-icon left>
              mdi-account
            </v-icon>
            About Me
          </div>
        </v-card-title>
        <v-container grid-list-md fluid>
          <v-row row wrap>
            <v-col cols="12">
              <v-text-field outlined label="Full name" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card ref="contact-details" class="mb-3">
        <v-card-title primary-title>
          <div class="title">
            <v-icon left>
              mdi-email
            </v-icon>
            Contact Detail
          </div>
        </v-card-title>
        <v-container grid-list-md fluid>
          <v-row row wrap>
            <v-col cols="12" md="6">
              <v-text-field outlined label="E-mail" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="Phone" />
            </v-col>
          </v-row>
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
        <v-container grid-list-md fluid>
          <v-row row wrap>
            <v-col cols="12">
              <v-textarea outlined rows="2" label="Address" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="City" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="State" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="Country" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="Postal Code" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card ref="update password" class="mb-3">
        <v-card-title primary-title>
          <div class="title">
            <v-icon left>
              mdi-lock
            </v-icon>
            Update password
          </div>
        </v-card-title>
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
                    (v) => v == rePassword || 'Passwords don\'t match'
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
                    (v) => v == newPassword || 'Passwords don\'t match'
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  :loading="saving.password"
                  :disabled="!passwordFormValid"
                  color="primary"
                  class="ma-0"
                  @click="savePassword()"
                >
                  Save
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
// import { mapGetters } from 'vuex';
import { getInitials } from '~/assets/js/main.js';

/* eslint-disable no-unused-vars, no-undef */
export default {
  data() {
    return {
      tableOfContent: [],
      passwordFormValid: false,
      oldPassword: null,
      newPassword: null,
      rePassword: null,
      saving: {
        about: false,
        contact: false,
        location: false,
        password: false
      },
      profileUploading: false,
      profileUploadError: false
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
      // eslint-disable-next-line no-prototype-builtins
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
    uploadProfilePhoto(e) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        this.saveLogo();
      };
      reader.onabort = () => {};
      // reader.error = (err) => console.log(err);

      reader.readAsDataURL(e.target.files[0]);
    },
    saveProfilePhoto() {
      this.profileUploading = true;
      this.profileUploadError = false;

      const formData = new FormData();
      const cover = document.getElementById('profile-image');
      const name = cover.files[0].name;
      formData.append('image', cover.files[0]);

      axios
        .post(`/api/upload/user-avatar`, formData)
        .then((res) => {
          this.profileUploading = false;
          this.profileUploadError = false;
          this.$store.commit('snackbar/show', {
            text: 'Profile photo uploaded successfully',
            icon: 'success'
          });
          this.$store.commit('user/setUser', {
            ...this.user,
            avatar: res.data.payload
          });
        })
        .catch((err) => {
          console.log(err);
          const { response, message } = err;
          // this.coverUploading = false;
          this.profileUploadError = true;
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
            icon: 'error'
          });
        });
    },
    savePassword() {
      this.saving.password = true;
      this.$axios
        .post('/api/user/set-password', {
          password: this.oldPassword,
          newPassword: this.newPassword
        })
        .then((res) => {
          this.saving.password = false;
          // if (res.data.state == 'OK') {
          // 	this.$store.commit('user/setUser', { ...this.user, businessName: res.data.payload.businessName, description: res.data.payload.description })
          // }
        })
        .catch((err) => {
          this.saving.password = false;
          console.log(err);
          const { response, message } = err;

          this.$store.commit(
            'snackbar/show',
            `${response.data.payload || 'Network Error'}.`
          );
        });
    }
  }
};
</script>

<style></style>
