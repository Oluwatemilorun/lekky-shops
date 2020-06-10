<template>
  <div>
    <v-app-bar app color="white" dense fixed class="pa-0 hidden-lg-and-up">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="pt-2 mr-3">
        <a href="/" class="d-block">
          <img
            src="~/assets/img/logo.jpg"
            alt="Cartts"
            width="90px"
            class="text-uppercase primary--text"
          />
        </a>
      </v-toolbar-title>

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
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              flat
              :color="hover ? 'grey lighten-2' : 'transparent'"
              to="/account/profile/me"
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
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      width="300"
      app
      temporary
      class="hidden-md-and-up"
    >
      <v-img
        :aspect-ratio="16 / 9"
        :src="(user && user.cover) || defCover"
        class="accent lighten-5"
      >
        <v-layout ma-0 pa-2 column fill-height class="lightbox white--text">
          <v-spacer />
          <v-flex shrink>
            <v-avatar
              size="70px"
              color="primary lighten-2"
              style="margin-top: -60px"
            >
              <v-img
                :src="(user && user.logo) || ''"
                width="70px"
                height="70px"
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
            <v-layout row wrap align-center ma-0>
              <v-flex>
                <div
                  class="subheading font-weight-bold truncate text-capitalize"
                >
                  {{ user.businessName }}
                </div>
                <div class="caption font-weight-bold">
                  @{{ user.username }}
                  <span class="caption ml-2 text-uppercase">{{
                    user.category
                  }}</span>
                </div>
              </v-flex>
              <v-flex shrink>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn text icon small color="white" v-on="on">
                      <v-icon small>
                        mdi-settings
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>User settings</span>
                </v-tooltip>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-img>
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
      <v-list>
        <v-list-item
          v-for="(item, index) in vendorMenu"
          :key="index"
          :to="item.url"
        >
          <v-list-item-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title class="text-capitalize">
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
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
      <v-divider />
    </v-navigation-drawer>
  </div>
</template>

<script>
import defCover from '~/assets/img/def-cover.jpg';
import { getInitials } from '~/assets/js/main.js';

export default {
  data() {
    return {
      defCover,
      drawer: false
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

<style></style>
