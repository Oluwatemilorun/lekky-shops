<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="960"
      app
      dark
      color="primary"
      class="py-5"
    >
      <div class="white--text pb-3 text-uppercase headline text-center">
        <span class="font-weight-black">{{ title }}</span>
      </div>
      <v-divider />
      <div class="text-center py-2">
        <v-avatar size="75" color="black">
          <v-icon color="primary" x-large>mdi-account</v-icon>
        </v-avatar>
        <v-list-item class="my-0">
          <v-list-item-content>
            <v-list-item-title>Jane Doe</v-list-item-title>
            <v-list-item-subtitle>janedoe@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-divider />

      <v-list nav shaped class="pt-0">
        <v-subheader class="text-uppercase">Main</v-subheader>
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

      <v-divider />

      <v-list nav shaped class="pt-0">
        <v-subheader class="text-uppercase">Others</v-subheader>
        <v-list-item router exact to="/settings">
          <v-list-item-action>
            <v-icon>mdi-tools</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Settings'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark flat color="black">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="text-uppercase primary--text font-weight-black hidden-md-and-up"
        v-text="title"
      />
    </v-app-bar>

    <v-main>
      <v-container fluid>
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
      title: 'Lekkyshops',
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
