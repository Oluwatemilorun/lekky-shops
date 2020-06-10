<template>
  <v-footer app absolute height="auto" dark class="pa-0">
    <v-layout row wrap>
      <v-flex v-if="!isSignedIn" xs12>
        <v-card flat color="primary accent-1">
          <v-container>
            <v-row justify="center" class="ma-0">
              <v-col cols="12" md="11">
                <v-row justify="center" align="center" class="my-5 mx-0">
                  <v-col cols="12" md="8">
                    <h3 class="display-1 font-weight-bold">
                      Hire or Get Hired!
                    </h3>
                    <p
                      class="font-weight-medium text-caption"
                      style="line-height: 20px"
                    >
                      Are you an individual looking to get task done or a <br />
                      Vendor looking to work on a task
                    </p>
                  </v-col>
                  <v-col cols="12" md="auto">
                    <v-btn outlined x-large color="white">
                      get started
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="flex" flat color="grey darken-3" tile>
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap justify-center my-5 pt-5>
                <v-btn
                  outlined
                  icon
                  color="white"
                  small
                  class="pa-0 mx-2 social-button"
                >
                  <v-icon small>
                    mdi-facebook
                  </v-icon>
                </v-btn>
                <v-btn
                  outlined
                  icon
                  color="white"
                  small
                  class="pa-0 mx-2 social-button"
                >
                  <v-icon small>
                    mdi-twitter
                  </v-icon>
                </v-btn>
                <v-btn
                  outlined
                  icon
                  color="white"
                  small
                  class="pa-0 mx-2 social-button"
                >
                  <v-icon small>
                    mdi-instagram
                  </v-icon>
                </v-btn>
                <v-btn
                  outlined
                  icon
                  color="white"
                  small
                  class="pa-0 mx-2 social-button"
                >
                  <v-icon small>
                    mdi-linkedin
                  </v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout
                row
                wrap
                justify-center
                align-center
                mb-5
                pb-3
                class="primary--text"
              >
                <v-btn text color="white" class="mx-2">
                  about us
                </v-btn>
                |
                <v-btn text color="white" class="mx-2">
                  FAQs
                </v-btn>
                |
                <v-btn text color="white" class="mx-2">
                  Categories
                </v-btn>
                |
                <v-btn text color="white" class="mx-2">
                  How it works
                </v-btn>
                |
                <v-btn text color="white" class="mx-2">
                  Privacy policy
                </v-btn>
                |
                <v-btn text color="white" class="mx-2">
                  Contact us
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-card-actions class="justify-center py-5">
            <div class="caption font-weight-light text-capitalize">
              &copy;2019 — <strong class="pr-2">LekkyShops</strong> All rights
              reserved.
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  computed: {
    isSignedIn() {
      return this.$store.state.user.isSignedIn;
    }
  }
};
</script>

<style>
.v-btn.social-button.v-btn--round {
  border-radius: 2px !important;
}
</style>
