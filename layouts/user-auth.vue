<template>
  <v-app>
    <v-content>
      <v-container fluid class="white pa-0" style="min-height: 100vh">
        <v-row>
          <v-col cols="12" md="5">
            <v-container fill-height>
              <v-row no-gutters justify="center">
                <v-col cols="12" md="10">
                  <img
                    src="~/assets/img/logo.jpg"
                    alt="LekkyShops"
                    height="36px"
                    class="mb-4 d-block mx-auto"
                  />
                </v-col>
                <v-col cols="12" md="10">
                  <nuxt />
                </v-col>
                <v-col cols="12" md="10">
                  <v-row justify="center" class="mt-5 mb-3">
                    <v-col cols="12">
                      <v-divider />
                    </v-col>
                    <span
                      class="overline grey--text my-2 text-xs-center white pa-2 mt-n7"
                    >
                      Or connect with
                    </span>
                  </v-row>
                </v-col>
                <v-col cols="12" md="10">
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        :loading="extLoading.facebook"
                        block
                        dark
                        color="blue darken-2"
                        @click="processFBLogin"
                      >
                        <v-icon left>
                          mdi-facebook
                        </v-icon>
                        facebook
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        :loading="extLoading.google"
                        block
                        dark
                        color="red darken-1"
                        @click="processGGLogin"
                      >
                        <v-icon left>
                          mdi-google-plus
                        </v-icon>
                        Google
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        :loading="extLoading.twitter"
                        block
                        dark
                        color="light-blue"
                      >
                        <v-icon left>
                          mdi-twitter
                        </v-icon>
                        Twitter
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" md="7" class="hidden-sm-and-down pa-0">
            <v-sheet tile width="100%" height="100%" class="auth-bg">
              <v-img src="/img/slides/02.jpg" height="100%" width="100%" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <Snackbar />
    <Footer />
  </v-app>
</template>

<script>
import Footer from '~/components/Footer';
import Snackbar from '~/components/Snackbar';

export default {
  components: { Footer, Snackbar },
  data() {
    return {
      extLoading: {
        facebook: false,
        google: false,
        twitter: false
      }
    };
  },
  methods: {
    /*
    processExternalLogin(party, accessToken) {
      this.$axios
        .post(`/api/login/${party}`, {
          FB_accessToken: accessToken,
          GG_accessToken: accessToken,
          TW_accessToken: accessToken
        })
        .then(({ data }) => {
          this.$store.commit('user/setUser', data.payload);
          // this.$store.commit('dialog/initLogin', false);
          this.$router.replace(
            this.$router.history.current.query.redirect || '/'
          );
        })
        .catch(({ response, message }) => {
          this.$store.commit('snackbar/show', {
            text: response
              ? response.data.message
              : 'Network error. Try again later.',
            icon: 'error'
          });
        })
        .finally(() => {
          this.processing = false;
          this.extLoading[party] = false;
        });
    },

    async processFBLogin() {
      this.extLoading.facebook = true;
      await FB.init({
        appId: '1118273571716933',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: false, // Parse social plugins on this webpage.
        version: 'v4.0' // Use this Graph API version for this call.
      });

      await FB.getLoginStatus((response) => {
        // Called after the JS SDK has been initialized.
        if (response.status === 'connected') {
          // Logged into your webpage and Facebook.
          this.processExternalLogin(
            'facebook',
            response.authResponse.accessToken
          );
        } else {
          // Not logged into your webpage or we are unable to tell.
          FB.login(
            (res) => {
              console.log(res);

              if (res.status === 'connected') {
                this.processExternalLogin(
                  'facebook',
                  res.authResponse.accessToken
                );
              } else {
                // The person is not logged into your webpage or we are unable to tell.
                this.$store.commit('snackbar/show', {
                  text: 'Error retrieving profile information from Facebook.',
                  icon: 'error'
                });
                this.extLoading.facebook = true;
              }
            },
            { scope: 'public_profile,email,user_location,user_photos' }
          );
        }
      });
    },
    processGGLogin() {
      this.extLoading.google = true;
      gapi.load('auth2', async () => {
        await gapi.auth2.init({
          client_id:
            '1098366570330-feiosc2ap3uunf0p3orc8tsj9hdmjtpb.apps.googleusercontent.com',
          fetch_basic_profile: true
        });

        const GoogleAuth = await gapi.auth2.getAuthInstance();

        if (GoogleAuth.isSignedIn.get()) {
          const GoogleUser = GoogleAuth.currentUser.get();
          const accessToken = GoogleUser.getAuthResponse().id_token;
          this.processExternalLogin('google', accessToken);
        } else {
          GoogleAuth.signIn({
            prompt: 'select_account',
            scope: 'profile email'
          })
            .then((GoogleUser) => {
              const accessToken = GoogleUser.getAuthResponse().id_token;
              this.processExternalLogin('google', accessToken);
            })
            .catch((err) => {
              console.log(err);
              this.extLoading.google = false;
              this.$store.commit('snackbar/show', {
                text: 'Error retrieving profile information from Google.',
                icon: 'error'
              });
            });
        }
      });
    },
    async initFB() {
      await FB.init({
        appId: '1118273571716933',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: false, // Parse social plugins on this webpage.
        version: 'v4.0' // Use this Graph API version for this call.
      });
    },
    async initGG() {
      await gapi.load('auth2');
    }
  }, */
    head() {
      return {
        script: [
          {
            src:
              'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0'
          },
          { src: 'https://apis.google.com/js/platform.js?onload=googleInit' },
          { src: '/js/googleAuth.js' }
        ]
      };
    }
  }
};
</script>

<style>
.auth-bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
}
</style>
