<template>
  <v-app>
    <v-row
      justify="center"
      align="center"
      class="fill-height auth-bg pa-0 ma-0"
    >
      <v-container>
        <v-row justify="center">
          <v-col cols="10" sm="8" md="6" lg="5">
            <v-card class="px-5 px-md-0">
              <v-row>
                <v-col cols="12">
                  <v-row justify="center">
                    <v-col cols="12" md="10" class="text-center pb-0">
                      <div class="label font-weight-bold text-uppercase">
                        connect with
                      </div>
                      <v-btn
                        :loading="extLoading.facebook"
                        fab
                        outlined
                        color="blue darken-4"
                        class="ma-2"
                        @click="processFBLogin"
                      >
                        <v-icon size="32"> mdi-facebook </v-icon>
                      </v-btn>
                      <v-btn
                        :loading="extLoading.twitter"
                        fab
                        outlined
                        color="blue"
                        class="ma-2"
                      >
                        <v-icon size="32"> mdi-twitter </v-icon>
                      </v-btn>
                      <v-btn
                        :loading="extLoading.google"
                        fab
                        outlined
                        color="red darken-3"
                        class="ma-2"
                        @click="processGGLogin"
                      >
                        <v-icon size="32"> mdi-gmail </v-icon>
                      </v-btn>
                      <div class="subtitle-2 font-weight-bold pt-2">OR</div>
                    </v-col>
                    <!-- Content -->
                    <v-col cols="12" md="10" class="py-0">
                      <nuxt />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <!-- Snackbar -->
    <Snackbar />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      extLoading: {
        facebook: false,
        google: false,
        twitter: false,
      },
    }
  },
  methods: {
    processExternalLogin(party, accessToken) {
      this.$axios
        .post(`/api/login/${party}`, {
          FB_accessToken: accessToken,
          GG_accessToken: accessToken,
          TW_accessToken: accessToken,
        })
        .then(({ data }) => {
          this.$store.commit('user/setUser', data.payload)
          // this.$store.commit('dialog/initLogin', false);
          this.$router.replace(
            this.$router.history.current.query.redirect || '/'
          )
        })
        .catch(({ response, message }) => {
          this.$store.commit('snackbar/show', {
            text: response
              ? response.data.message
              : 'Network error. Try again later.',
            icon: 'error',
          })
        })
        .finally(() => {
          this.processing = false
          this.extLoading[party] = false
        })
    },

    async processFBLogin() {
      this.extLoading.facebook = true
      await window.FB.init({
        appId: '1118273571716933',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: false, // Parse social plugins on this webpage.
        version: 'v4.0', // Use this Graph API version for this call.
      })

      await window.FB.getLoginStatus((response) => {
        // Called after the JS SDK has been initialized.
        if (response.status === 'connected') {
          // Logged into your webpage and Facebook.
          this.processExternalLogin(
            'facebook',
            response.authResponse.accessToken
          )
        } else {
          // Not logged into your webpage or we are unable to tell.
          window.FB.login(
            (res) => {
              if (res.status === 'connected') {
                this.processExternalLogin(
                  'facebook',
                  res.authResponse.accessToken
                )
              } else {
                // The person is not logged into your webpage or we are unable to tell.
                this.$store.commit('snackbar/show', {
                  text: 'Error retrieving profile information from Facebook.',
                  icon: 'error',
                })
                this.extLoading.facebook = true
              }
            },
            { scope: 'public_profile,email,user_location,user_photos' }
          )
        }
      })
    },
    processGGLogin() {
      this.extLoading.google = true
      window.gapi.load('auth2', async () => {
        await window.gapi.auth2.init({
          client_id:
            '1098366570330-feiosc2ap3uunf0p3orc8tsj9hdmjtpb.apps.googleusercontent.com',
          fetch_basic_profile: true,
        })

        const GoogleAuth = await window.gapi.auth2.getAuthInstance()

        if (GoogleAuth.isSignedIn.get()) {
          const GoogleUser = GoogleAuth.currentUser.get()
          const accessToken = GoogleUser.getAuthResponse().id_token
          this.processExternalLogin('google', accessToken)
        } else {
          GoogleAuth.signIn({
            prompt: 'select_account',
            scope: 'profile email',
          })
            .then((GoogleUser) => {
              const accessToken = GoogleUser.getAuthResponse().id_token
              this.processExternalLogin('google', accessToken)
            })
            .catch((err) => {
              const { response } = err
              this.extLoading.google = false
              this.$store.commit('snackbar/show', {
                text:
                  'Error retrieving profile information from Google.' ||
                  response.data.message,
                icon: 'error',
              })
            })
        }
      })
    },
    async initFB() {
      await window.FB.init({
        appId: '1118273571716933',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: false, // Parse social plugins on this webpage.
        version: 'v4.0', // Use this Graph API version for this call.
      })
    },
    async initGG() {
      await window.gapi.load('auth2')
    },
  },
  head() {
    return {
      script: [
        {
          src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0',
        },
        { src: 'https://apis.google.com/js/platform.js?onload=googleInit' },
        { src: '/js/googleAuth.js' },
      ],
    }
  },
}
</script>

<style>
.auth-bg {
  background-image: linear-gradient(60deg, #434343, #000000);
  background-size: cover;
}
.info-bg {
  background-image: linear-gradient(300deg, #434343, #000000);
  background-size: cover;
  height: 100%;
}
.logo {
  font-family: Georgia, 'Times New Roman', Times, serif !important;
  font-size: 2.5rem;
  font-weight: 900;
}
</style>
