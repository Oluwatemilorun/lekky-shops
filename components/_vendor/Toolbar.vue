<template>
  <v-app-bar
    app
    color="white"
    dense
    extended
    fixed
    class="pa-0 hidden-md-and-down"
    extension-height="48px"
  >
    <v-toolbar-title class="pt-2 mr-3">
      <a href="/" class="d-block">
        <img
          src="~/assets/img/logo.jpg"
          alt="LekkyShops"
          width="90px"
          class="text-uppercase primary--text"
        />
      </a>
    </v-toolbar-title>
    <v-btn text small color="black">
      How it works
    </v-btn>
    <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text small color="black" v-on="on">
          help
          <v-icon small right>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item>
          <v-list-item-title>Advertiser support</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>FAQs</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Send Feedback</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer />

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon small color="black" class="mx-2" v-on="on">
          <v-badge right overlap color="accent" class="notification-badge">
            <span slot="badge" class="caption">3</span>
            <v-icon size="20px">
              mdi-bell
            </v-icon>
          </v-badge>
        </v-btn>
      </template>
      <span>Notifications</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon small color="black" class="mx-2" v-on="on">
          <v-icon size="20px">
            mdi-settings
          </v-icon>
        </v-btn>
      </template>
      <span>Vendor Settings</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            flat
            to="/account/profile/me"
            :color="hover ? 'grey lighten-2' : 'transparent'"
            v-on="on"
          >
            <v-layout v-if="isSignedIn" shrink align-center mx-2 my-1>
              <v-avatar size="30px" color="accent">
                <img v-if="user && user.logo" :src="user.logo" />
                <div v-else-if="user && user.name" class="white--text">
                  {{ getInitials(user.name) }}
                </div>
                <v-icon v-else color="white">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <div class="ml-2" style="width: 120px">
                <div
                  class="font-weight-medium black--text pa-0 ma-0 text-truncate"
                >
                  {{ user.name }}
                </div>
                <!-- <span class="caption">{{ user && user.businessCountry }}</span> -->
              </div>
            </v-layout>
          </v-card>
        </v-hover>
      </template>
      <span>Switch to user account</span>
    </v-tooltip>

    <template v-slot:extension>
      <v-layout
        row
        class="primary"
        fill-height
        justify-space-around
        align-center
        style="margin: 0 -24px; px-4"
      >
        <v-btn
          v-for="(item, index) in vendorMenu"
          :key="index"
          text
          color="white"
          small
          :to="`${item.url}`"
        >
          <v-icon small left>
            {{ item.icon }}
          </v-icon>
          {{ item.name }}
        </v-btn>
      </v-layout>
    </template>
  </v-app-bar>
</template>

<script>
import { getInitials } from '~/assets/js/main.js';

export default {
  name: 'toolbar',
  data() {
    return {
      searchStarted: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    isSignedIn() {
      return this.$store.state.user.isSignedIn;
    },
    vendorMenu() {
      return this.$store.state.vendor.menu;
    }
  },
  methods: {
    getInitials
  }
};
</script>

<style>
.notification-badge .v-badge__badge {
  width: 18px;
  height: 18px;
}
</style>
