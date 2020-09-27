<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <v-toolbar color="transparent" flat>
        <v-toolbar-title class="headline"> Account Overview </v-toolbar-title>
      </v-toolbar>
      <v-card ref="profile-picture" class="mb-3" flat>
        <v-row no-gutters>
          <v-col cols="12" class="ma-3">
            <v-row no-gutters class="scroll-x">
              <label for="profile-image">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon height="150" width="150" v-on="on">
                      <v-avatar size="150" color="primary">
                        <v-img v-if="user && user.avatar" :src="user.avatar" />
                        <v-container
                          v-else
                          fill-height
                          fluid
                          class="white--text display-2"
                        >
                          <v-row
                            justify="center"
                            align="center"
                            class="font-weight-bold text-capitalize"
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
                      </v-avatar>
                    </v-btn>
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
      <v-card ref="contact-details" flat>
        <v-card-title primary-title>
          <div class="title">Contact Details</div>
          <v-spacer />
          <v-btn icon color="primary">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <v-container grid-list-md fluid>
          <v-row row wrap>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.name"
                readonly
                outlined
                label="Name"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.email"
                readonly
                outlined
                label="Email"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field readonly outlined label="Phone" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card ref="address" class="my-2">
        <v-card-title primary-title>
          <div class="title">Shipping Address</div>
          <v-spacer />
          <v-btn icon color="primary">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
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
  </v-row>
</template>

<script>
// import { mapGetters } from 'vuex';
import { getInitials } from '~/assets/js/main.js'

/* eslint-disable no-unused-vars, no-undef */
export default {
  data() {
    return {
      tableOfContent: [],
      saving: {
        about: false,
        contact: false,
        location: false,
        password: false,
      },
      profileUploading: false,
      profileUploadError: false,
    }
  },
  computed: {
    // ...mapGetters({
    // 	'user/'
    // })
    user() {
      return this.$store.state.user.user
    },
    scrollY() {
      return this.$store.state.scroll.scrollY + 10
    },
  },
  mounted() {
    const tableOfContent = []
    for (const sects in this.$refs) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.$refs.hasOwnProperty(sects)) {
        tableOfContent.push({
          name: sects.replace(/-/g, ' '),
          target: this.$refs[sects],
        })
      }
    }
    this.tableOfContent = tableOfContent
  },
  methods: {
    getInitials,
    uploadProfilePhoto(e) {
      const reader = new FileReader()
      reader.onload = () => {
        this.profileImage = reader.result
        this.saveLogo()
      }
      reader.onabort = () => {}
      // reader.error = (err) => console.log(err);

      reader.readAsDataURL(e.target.files[0])
    },
    saveProfilePhoto() {
      this.profileUploading = true
      this.profileUploadError = false

      const formData = new FormData()
      const cover = document.getElementById('profile-image')
      const name = cover.files[0].name
      formData.append('image', cover.files[0])

      axios
        .post(`/api/upload/user-avatar`, formData)
        .then((res) => {
          this.profileUploading = false
          this.profileUploadError = false
          this.$store.commit('snackbar/show', {
            text: 'Profile photo uploaded successfully',
            icon: 'success',
          })
          this.$store.commit('user/setUser', {
            ...this.user,
            avatar: res.data.payload,
          })
        })
        .catch((err) => {
          const { response, message } = err
          // this.coverUploading = false;
          this.profileUploadError = true
          this.$store.commit('snackbar/show', {
            text: (response && response.statusText) || message,
            icon: 'error',
          })
        })
    },
  },
}
</script>

<style></style>
