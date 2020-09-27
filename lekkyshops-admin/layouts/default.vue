<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      mobile-breakpoint="960"
      color="primary"
      dark
      hide-overlay
      app
    >
      <v-list dark nav>
        <v-list-item v-for="(item, i) in links" :key="i" :to="item.to" exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn
            block
            color="accent"
            class="text-capitalize"
            depressed
            @click="signOut"
          >
            Logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left app height="64" color="white">
      <v-btn
        icon
        color="primary"
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      >
        <v-icon large>mdi-sort-variant</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-2">
        <v-img src="/logo.png" />
      </v-toolbar-title>
      <v-divider vertical inset class="mx-2" />
      <span class="primary--text title font-weight-bold"> Admin </span>

      <v-spacer />

      <v-btn icon height="42" width="42" style="cursor: default">
        <v-avatar
          size="42"
          color="primary"
          class="headline white--text font-weight-bold text-uppercase"
        >
          <span>A</span>
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <!-- content -->
    <v-main>
      <v-container fluid class="pt-0">
        <nuxt />
        <Snackbar />
      </v-container>
    </v-main>

    <v-footer app>
      <v-container fluid>
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <a href="/" style="text-decoration: none" class="pl-2">Kipspace</a>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import getInitials from '~/utils/getInitials'

export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-tag-multiple',
          title: 'Categories',
          to: '/categories',
        },
        {
          icon: 'mdi-office-building',
          title: 'Facilities',
          to: '/facilities',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Users',
          to: '/users',
        },
      ],
    }
  },
  computed: {},
  methods: {
    getInitials,
    toggleDrawer() {
      this.drawer = !this.drawer
    },
  },
}
</script>

<style>
.v-application {
  font-family: 'Montserrat', sans-serif;
}

/* Vuetify typography helper classes font-family */
.v-application .display-4,
.v-application .display-3,
.v-application .display-2,
.v-application .display-1,
.v-application .headline,
.v-application .title,
.v-application .subtitle-1,
.v-application .subtitle-2,
.v-application .text-sm-h4,
.v-application .text-h6,
.v-application .text-md-h5,
.v-application .text-h5,
.v-application .text-caption,
.v-application .text-sm-subtitle-1 {
  font-family: 'Montserrat', sans-serif !important;
}
</style>
