<template>
  <v-footer dark padless>
    <v-card flat tile dark width="100%">
      <v-card-text class="px-10">
        <v-row justify="space-between">
          <v-col cols="12" md="6">
            <v-row justify="space-between">
              <v-col cols="12" md="5" class="pa-0">
                <div class="title">About LekkyShops</div>
                <div class="subtitle-1 py-2">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque.
                </div>
              </v-col>
              <v-col cols="12" md="6" class="pa-0 foot-links">
                <div class="subtitle-1 font-weight-bold ml-md-5">
                  Site Links
                </div>
                <v-list flat class="pa-0" color="transparent">
                  <v-list-item
                    v-for="l in 6"
                    :key="l"
                    link
                    class="ma-2 ml-0 pl-0"
                  >
                    <v-list-item-title class="grey--text text--lighten-1">
                      Some link {{ l }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="5" class="pl-0">
            <div class="headline text-uppercase font-weight-bold">
              Top deals
            </div>
            <div class="subtitle-1 text-capitalize">
              come to those on our newsletter
            </div>
            <div class="py-2">
              Recieve email-only deals, exclusive product offers and many more
            </div>
            <div id="sub">
              <v-text-field
                solo-inverted
                placeholder="Enter your email..."
                flat
              >
                <v-btn
                  slot="append"
                  depressed
                  color="accent"
                  large
                  class="text-capitalize"
                >
                  Submit
                </v-btn>
              </v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <div class="subtitle-1 text-center text-md-left">
              <b class="pr-1">LekkyShops</b>
              &copy; {{ new Date().getFullYear() }}
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="text-center text-md-right">
            <v-btn v-for="icon in icons" :key="icon" icon small class="mx-2">
              <v-icon small color="white">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-youtube',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>

<style>
#sub .v-text-field__details {
  display: none;
}
#sub .v-input__control > .v-input__slot {
  padding-right: 2px;
}
.foot-links .v-list .v-list-item {
  display: inline-block;
  min-height: 18px;
}
</style>
