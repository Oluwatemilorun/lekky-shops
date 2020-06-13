<template>
  <v-container>
    <v-row>
      <v-col cols="auto" class="relative hidden-md-and-down">
        <v-sheet width="250px">
          <v-row no-gutters>
            <v-card
              flat
              color="transparent"
              width="250px"
              style="position: fixed"
            >
              <v-layout row wrap justify-center>
                <div
                  class="grey lighten-3"
                  style="position: relative; width: 100%; height: 135px"
                >
                  <v-flex xs12 pa-0 ma-0>
                    <v-img
                      :src="(user && user.cover) || defCover"
                      height="135px"
                      cover
                      class="primary lighten-2 d-block mx-auto"
                    />
                  </v-flex>
                </div>
                <v-avatar
                  size="120px"
                  color="primary lighten-2"
                  class="elevation-3"
                  style="margin-top: -60px"
                >
                  <v-img
                    :src="(user && user.logo) || ''"
                    width="120px"
                    height="120px"
                    cover
                    class="white d-block mx-auto"
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="primary" />
                    </v-layout>
                  </v-img>
                </v-avatar>
                <!-- <v-flex xs12>
								</v-flex> -->
                <v-flex xs12>
                  <v-list two-line dense class="transparent vendor-specs-bar">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          class="title text-capitalize text-truncate text-xs-center"
                        >
                          {{ user.businessName }}
                        </v-list-item-title>
                        <div
                          class="caption grey--text text--darken-1 d-block mx-auto"
                        >
                          @{{ user.username }}
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-hexagon</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="text-capitalize">
                          {{ user.category }}
                        </v-list-item-title>
                        <div class="caption grey--text text--darken-1">
                          Category
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-hexagon-multiple</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="text-capitalize">
                          {{ user.subCategory }}
                        </v-list-item-title>
                        <div class="caption grey--text text--darken-1">
                          Sub Category
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-package</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="text-capitalize">
                          {{ user.package }}
                        </v-list-item-title>
                        <div class="caption grey--text text--darken-1">
                          Package
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-card>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="">
        <v-container fluid class="py-0">
          <nuxt-child />
        </v-container>
      </v-col>
      <v-col cols="12" md="auto">
        <v-sheet width="280px" class="relative">
          <v-row style="position: fixed; width: 280px;">
            <v-col cols="12">
              <v-banner two-line sticky>
                <span class="caption">
                  Verify your E-mail address
                </span>

                <template v-slot:actions>
                  <v-btn text small color="accent">
                    Verify
                  </v-btn>
                </template>
              </v-banner>
            </v-col>
            <v-col cols="12">
              <v-list dense class="transparent">
                <template v-for="(item, index) in childAlerts">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div :key="index" v-html="item" />
                </template>
              </v-list>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import defCover from '~/assets/img/def-cover.jpg';

export default {
  layout: 'vendor',
  middleware: ['authenticated', 'clearAlert'],
  // validate ({ query }) {
  // 	const sects = ['me', 'appointments', 'bookings', 'cart', 'services', 'favourites'];

  // 	return  (!query.sect) ? true :
  // 		(query.sect && sects.find(a => a == query.sect)) ? true :
  // 			false;
  // },
  // async asyncData ({ $axios,  query, redirect }) {
  // redirect('/account/vendor/about');
  // console.log(query);
  // try {
  // 	if (!query.sect) await redirect('/account/profile?sect=me');

  // 	let sect = query.sect || 'me';

  // 	return {
  // 		sect: sect
  // 	}
  // } catch (e) {
  // 	let { response } = e;
  // 	if (response) error({ statusCode: response.status, message: response.statusText });
  // 	else error({ statusCode: 500, message: e.message });
  // }
  // },
  data() {
    return {
      authDialog: true,
      tableOfContent: [],
      tableOfContentOptions: {
        duration: 400,
        offset: 10,
        easing: 'easeOutCubic'
      },
      vendorView: false,
      defCover
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    isSignedIn() {
      return this.$store.state.user.isSignedIn;
    },
    scrollY() {
      return this.$store.state.scroll.scrollY + 10;
    },
    childAlerts() {
      return this.$store.state.alerts.vendor;
    }
  },
  methods: {
    setTableOfContent(items) {
      this.tableOfContent = items;
    }
  }
};
</script>

<style>
.v-list .active .v-list__tile {
  border-left: 3px solid #1976d2;
}
.vendor-specs-bar .v-list__tile {
  padding: 0;
}
.v-banner__wrapper .v-banner__actions {
  margin-left: 50px;
}
</style>
