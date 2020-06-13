<template>
  <v-container>
    <v-row>
      <v-col cols="auto" class="hidden-md-and-down">
        <v-sheet elevation="1" class="relative">
          <v-navigation-drawer
            floating
            permanent
            stateless
            width="300px"
            value="true"
          >
            <!-- <v-toolbar color="grey lighten-3" dense flat>
							<h1 class="headline font-weight-bold">Accont Information</h1> 
						</v-toolbar> -->
            <v-list dense class="pa-0">
              <v-list-item
                v-for="(item, index) in userMenu"
                :key="index"
                active-class="secondary--text edit-active"
                nuxt
                exact
                :to="item.url"
              >
                <v-list-item-avatar>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
              <v-divider />
            </v-list>
          </v-navigation-drawer>
        </v-sheet>
      </v-col>
      <v-col>
        <v-row no-gutters>
          <v-col cols="12" md="10">
            <v-container fluid class="py-0">
              <nuxt-child />
            </v-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // watchQuery: true,
  middleware: 'authenticated',
  // validate ({ query }) {
  // 	const sects = ['me', 'appointments', 'bookings', 'cart', 'services', 'favourites'];

  // 	return  (!query.sect) ? true :
  // 		(query.sect && sects.find(a => a == query.sect)) ? true :
  // 			false;
  // },
  /* async asyncData({ $axios, req, query, redirect, error }) {
    if (!!req && req.originalUrl === '/account/profile')
      redirect('/account/profile/me');
    // 	try {
    // 		// if (!query.sect) await redirect('/account/profile/me');

    // 		return {
    // 			sect: sect
    // 		}
    // 	} catch (e) {
    // 		let { response } = e;
    // 		if (response) error({ statusCode: response.status, message: response.statusText });
    // 		else error({ statusCode: 500, message: e.message });
    // 	}
  }, */
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
      userMenu: this.$store.state.user.menu
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    isSignedIn() {
      return this.$store.state.user.isSignedIn;
    },
    // currentSect () {
    // 	return () => import(`~/components/_profile/${this.sect}`);
    // },
    scrollY() {
      return this.$store.state.scroll.scrollY + 10;
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
</style>
