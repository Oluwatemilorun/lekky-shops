<template>
  <div id="app">
    <v-app>
      <!-- Header -->
      <topNav />

      <v-content>
        <router-view />
      </v-content>

      <!-- Footer -->
      <v-footer dark padless>
        <footerNav />
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import footerNav from "@/components/footer.vue";
import topNav from "@/components/header.vue";

export default {
  name: "App",
  components: {
    footerNav,
    topNav
  }
};
</script>
