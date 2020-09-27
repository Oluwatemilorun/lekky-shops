<template>
  <v-app id="app">
    <Header />

    <!-- Content -->
    <main>
      <nuxt />
      <Snackbar />
    </main>

    <Footer />
  </v-app>
</template>

<script>
export default {
  //
}
</script>

<style>
#app,
.v-application {
  font-family: 'Montserrat', sans-serif;
}

/* Vuetify Helper classes for typography */
.v-application .display-3,
.v-application .display-2,
.v-application .display-1,
.v-application .headline,
.v-application .title,
.v-application .text-h4,
.v-application .subtitle-1,
.v-application .subtitle-2,
.v-application .caption {
  font-family: 'Montserrat', sans-serif !important;
}

a {
  text-decoration: none;
}
</style>
