<template>
  <v-app-bar
    app
    color="white"
    fixed
    extended
    extension-height="40px"
    :flat="!hasScrolled"
    class="hidden-sm-and-down"
    :class="{ 'search-started': searchStarted }"
  >
    <v-container>
      <v-row align="center">
        <v-toolbar-title class="pt-2 mr-3">
          <a href="/" class="d-block">
            <img
              src="/img/logo.jpg"
              alt="Cartts"
              width="90px"
              class="text-uppercase primary--text"
            />
          </a>
        </v-toolbar-title>
        <v-spacer />
        <v-menu
          v-model="searchMenu"
          offset-y
          :open-delay="600"
          nudge-right="-230"
          origin="top right"
          transition="slide-x-reverse-transition"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, value }">
            <v-text-field
              id="main-search"
              ref="main-search"
              hide-details
              clearable
              placeholder="Search service, vendor, category..."
              append-icon="mdi-magnify"
              class="search-box d-block mx-2 px-2"
              v-on="on"
              @focus="searchStarted = true"
              @blur="
                () =>
                  (value &&
                    (searchStarted = true) + $refs['main-search'].focus()) ||
                  (!value && (searchStarted = false))
              "
            />
            <!-- @blur="() => hover && (searchStarted = true) + $refs['main-search'].focus() || !hover && (searchStarted = false)" -->
          </template>

          <v-card height="200px" width="510px">
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
        <v-btn
          depressed
          class="mx-2 primary--text text--darken-1"
          :to="`/account/`"
        >
          Become a vendor
        </v-btn>
        <v-btn
          v-if="!isSignedIn"
          class="ml-2"
          depressed
          color="accent"
          :to="`/account/login?redirect=${$router.history.current.fullPath}`"
        >
          login / signup
        </v-btn>

        <v-menu v-if="isSignedIn" open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-card
              v-if="isSignedIn"
              flat
              outlined
              width="250px"
              height="40px"
              v-on="on"
            >
              <v-row
                no-gutters
                align="center"
                justify="space-around"
                wrap
                fill-height
              >
                <v-col cols="auto">
                  <v-avatar size="30px" color="accent">
                    <img v-if="user && user.avatar" :src="user.avatar" />
                    <div v-if="user && user.name" class="white--text">
                      {{ getInitials(user.name) }}
                    </div>
                    <v-icon v-else color="white">
                      mdi-account-circle
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-row no-gutters align="center">
                    <div
                      class="font-weight-bold accent--text pa-0 ma-0 text-truncate body-2"
                      style="line-height: 16px"
                    >
                      Hello, {{ (user && user.name.split(' ')[0]) || '' }}
                    </div>
                    <span class="caption">{{ user && user.email }}</span>
                  </v-row>
                </v-col>
                <v-col cols="auto">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-col>
              </v-row>
            </v-card>
          </template>
          <v-list dense class="pa-0">
            <v-card
              color="primary"
              tile
              class="pa-3"
              :to="`/account/vendor/about`"
            >
              <v-row no-gutters>
                <v-col cols="10">
                  <div
                    class="font-weight-bold truncate mb-1 white--text"
                    style="font-size:18px; line-height: 13px"
                  >
                    {{ user.businessName || 'Vendor' }}
                  </div>
                  <span class="caption white--text">
                    Switch to vendor account
                  </span>
                </v-col>
                <v-col cols="auto">
                  <v-icon large color="white">
                    mdi-chevron-right
                  </v-icon>
                </v-col>
              </v-row>
            </v-card>
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
            <v-list-item class="primary lighten-3" @click="logout">
              <v-list-item-avatar>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
    <template v-slot:extension>
      <v-container fill-height>
        <v-row class="pa-0">
          <v-menu
            transition="slide-x-transition"
            :min-width="$vuetify.breakpoint.width - 20"
            bottom
            right
            open-on-hover
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <v-btn text small v-on="on">
                All categories
                <v-icon right>
                  mdi-menu
                </v-icon>
              </v-btn>
            </template>

            <v-card width="100%" height="100%">
              <v-container fluid>
                <v-row justify="space-around">
                  <v-col cols="auto">
                    <v-sheet width="200px">
                      <v-list style="width: 100%" dense>
                        <v-list-item
                          v-for="(item, index) in categories"
                          :key="index"
                          :class="{
                            'primary--text':
                              selectedCategory &&
                              selectedCategory.name == item.name
                          }"
                          @click="selectCategory(item)"
                        >
                          <v-list-item-title class="text-capitalize">
                            {{ item.name }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-sheet>
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="8">
                    <CategoryBar :category="selectedCategory" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-menu>

          <v-btn
            v-for="(item, index) in categories"
            :key="index"
            small
            text
            color="black"
            class="mx-2"
            :to="`/category/${item.name.replace(/ /g, '-')}`"
          >
            {{ item.name }}
          </v-btn>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script>
import { getInitials } from '~/assets/js/main.js';
import CategoryBar from '~/components/_parts/CategoryBar';

export default {
  components: { CategoryBar },
  data() {
    return {
      searchStarted: false,
      searchTabs: 'search-top',
      searchMenu: false,
      selectedCategory: this.$store.state.category.categories[0]
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
    getInitials,
    selectCategory(category) {
      this.selectedCategory = category;
    },
    logout() {
      this.$store.dispatch('user/logout', {
        $axios: this.$axios,
        $router: this.$router
      });
    }
    // hover && (searchStarted = true) + $refs['main-search'].$el.focus() || this.searchStarted = false
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
.search-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: 48px;
  z-index: 20;
}
.search-dropdown-overlay {
  position: fixed;
  top: 0%;
  left: 0;
  bottom: 0%;
  right: 0;
  display: none;
}
.search-started .search-dropdown-overlay {
  display: block;
}
.vendor-link {
  text-decoration: none;
}
.vendor-link div {
  line-height: 1.2;
}
</style>
