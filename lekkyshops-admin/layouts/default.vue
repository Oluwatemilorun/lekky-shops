<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="900"
      clipped
      app
      dark
      color="primary"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in links"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left app color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
        <Snackbar />
      </v-container>
    </v-main>
    <v-footer app>
      <v-container fluid>
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <a href="/" style="text-decoration: none" class="pl-2">{{ title }}</a>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'LekkyShops',
      drawer: false,
    }
  },
  computed: {
    links() {
      return this.$store.state.links
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
