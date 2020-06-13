<template>
  <div>
    <v-app-bar
      app
      fixed
      :flat="!hasScrolled"
      color="white"
      class="mobile-toolbar hidden-md-and-up"
      :class="{ 'search-started': searchStarted }"
    >
      <v-row align="center" no-gutters>
        <v-app-bar-nav-icon
          v-if="!searchStarted"
          @click.stop="drawer = !drawer"
        />
        <v-toolbar-title v-if="!searchStarted" class="pt-1 mx-0">
          <a href="/" class="d-block">
            <!--<img
              src="/img/logo.jpg"
              alt="LekkyShops"
              width="70px"
              class="text-uppercase primary--text"
            /> -->
            <h1 class="headline font-weight-bold text-uppercase">LekkyShops</h1>
          </a>
        </v-toolbar-title>
        <v-spacer v-if="!searchStarted" />
        <v-btn v-if="!searchStarted" text icon color="black">
          <v-icon>mdi-map-search</v-icon>
        </v-btn>
        <v-menu
          v-model="searchMenu"
          offset-y
          origin="top right"
          transition="slide-y-transition"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, value }">
            <v-text-field
              id="main-search"
              ref="main-search"
              hide-details
              label="What are you looking for?"
              solo
              flat
              clearable
              class="search-box mobile d-block"
              :background-color="searchStarted ? 'tertiary lighten-5' : 'white'"
              v-on="on"
              @focus="(searchStarted = true) + on"
              @blur="
                () =>
                  (value &&
                    (searchStarted = true) + $refs['main-search'].focus()) ||
                  (!value && (searchStarted = false))
              "
            >
              <!-- @focus="searchStarted = true"
							@blur="() => hover && (searchStarted = true) + $refs['main-search'].focus() || !hover && (searchStarted = false)" -->
              <template v-slot:prepend-inner>
                <v-icon color="black" v-on="on">
                  mdi-magnify
                </v-icon>
              </template>
              <!-- <template v-if="searchStarted" v-slot:append>
								<v-icon color="black" @click="(hover = false) + $refs['main-search'].blur()">mdi-close</v-icon>
							</template>-->
            </v-text-field>
          </template>
          <v-card height="300px" :width="$vuetify.breakpoint.width - 10">
            <v-toolbar color="transparent" dense flat tabs>
              <v-tabs
                v-model="searchTabs"
                color="transparent"
                slider-color="primary"
              >
                <v-tab active-class="primary--text" href="#search-top">
                  Top
                </v-tab>
                <v-tab active-class="primary--text" href="#search-service">
                  Services
                </v-tab>
                <v-tab active-class="primary--text" href="#search-vendor">
                  Vendors
                </v-tab>
                <v-tab active-class="primary--text" href="#search-product">
                  Products
                </v-tab>
                <v-tab active-class="primary--text" href="#search-location">
                  Location
                </v-tab>
              </v-tabs>
            </v-toolbar>
            <v-tabs-items>
              <v-tab-item value="search-top" />
              <v-tab-item value="search-service" />
              <v-tab-item value="search-vendor" />
              <v-tab-item value="search-product" />
              <v-tab-item value="search-location" />
            </v-tabs-items>
          </v-card>
        </v-menu>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      class="hidden-md-and-up"
      temporary
      :width="300"
    >
      <v-container v-if="!isSignedIn">
        <v-row>
          <v-col cols="6">
            <v-btn
              outlined
              block
              color="primary"
              :to="
                `/account/login?redirect=${$router.history.current.fullPath}`
              "
            >
              login
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn outlined block color="primary" to="/account/register">
              register
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-list v-else class="pa-0">
        <v-list-group>
          <template v-slot:activator>
            <v-layout align-center pa-3>
              <v-avatar size="36px" color="accent">
                <img v-if="user && user.avatar" :src="user.avatar" />
                <div v-if="user && user.name" class="white--text">
                  {{ getInitials(user.name) }}
                </div>
                <v-icon v-else color="white">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <div class="ml-3" style="width: 120px">
                <div
                  class="font-weight-bold accent--text pa-0 ma-0 text-truncate"
                >
                  Hello, {{ (user && user.name.split(' ')[0]) || '' }}
                </div>
                <span class="caption">{{ user && user.email }}</span>
              </div>
            </v-layout>
          </template>
          <v-list dense class="pa-0">
            <v-list-item
              two-line
              dark
              class="accent"
              to="/account/vendor/about"
            >
              <v-list-item-content>
                <v-list-item-title class="truncate">
                  {{ user.businessName || 'Vendor' }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Switch to vendor account
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              v-for="(item, index) in userMenu"
              :key="index"
              :to="`${item.url}`"
            >
              <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
            <!-- <v-list-item class="primary lighten-2" @click="logout">
							<v-list-item-avatar>
								<v-icon>mdi-logout</v-icon>
							</v-list-item-avatar>
							<v-list-item-title>Log out</v-list-item-title>
						</v-list-item>-->
          </v-list>
        </v-list-group>
      </v-list>
      <v-container>
        <v-row no-gutters>
          <v-btn block color="primary">
            <v-icon left class="-3">
              mdi-cellphone-iphone
            </v-icon>
            get mobile app
          </v-btn>
        </v-row>
      </v-container>
      <v-list subheader>
        <v-subheader class="px-3 pt-3 pb-1">
          Categories
        </v-subheader>
        <v-list-group
          v-for="(item, index) in categories"
          :key="index"
          no-action
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="item.cover" />
              </v-list-item-avatar>
              <v-list-item-title class="text-capitalize">
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(item2, index2) in item.subs"
            :key="index2"
            :to="`/category/${item2.name.replace(/(\s&amp;\s)|\s|\,\s/g, '-')}`"
          >
            <v-list-item-content class="text-capitalize">
              {{ item2.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item>
          <v-list-item-title class="font-weight-bold text-uppercase">
            How it works
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="font-weight-bold text-uppercase">
            Become a vendor
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="font-weight-bold text-uppercase">
            Store
          </v-list-item-title>
        </v-list-item>
        <!-- <v-list-item>
					<v-list-item-title class="font-weight-bold text-uppercase">become a vendor</v-list-item-title>
				</v-list-item>-->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { getInitials } from '~/assets/js/main.js';

export default {
  data() {
    return {
      search: null,
      searchStarted: false,
      drawer: false,
      searchMenu: false,
      searchTabs: 'search-top'
    };
  },
  computed: {
    hasScrolled() {
      return this.$store.state.scroll.hasScrolled;
    },
    categories() {
      return this.$store.state.category.categories;
    },
    user() {
      return this.$store.state.user.user;
    },
    isSignedIn() {
      return this.$store.state.user.isSignedIn;
    },
    userMenu() {
      return this.$store.state.user.menu;
    }
  },
  watch: {
    searchMenu(a, b) {
      this.searchStarted = a;
      !a && this.$refs['main-search'].blur();
    }
  },
  methods: {
    getInitials
  }
};
</script>

<style>
.search-box {
  flex: 0 0 auto;
  display: inline-block;
  width: 280px;
  transition: background 0.2s, flex 0.2s, opacity 0.2s, width 0.2s,
    -webkit-box-flex 0.2s, -ms-flex 0.2s !important;
}
.search-box.mobile {
  width: 50px;
}
.search-started .search-box,
.search-started .search-box.mobile {
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  transition: background 0.2s, flex 0.2s, opacity 0.2s, width 0.2s,
    -webkit-box-flex 0.2s, -ms-flex 0.2s !important;
}
.search-started .will-hide-buttons {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin: 0;
  visibility: hidden;
  width: 0;
  transition: flex 0.2s, margin 0.2s, width 0.2s, -webkit-box-flex 0.2s,
    -ms-flex 0.2s;
}
.mobile-toolbar .v-toolbar__content {
  padding: 0 5px;
}
</style>
