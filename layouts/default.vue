<template>
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
</template>

<script>
import footerNav from '@/components/footer.vue';
import topNav from '@/components/header.vue';

export default {
  name: 'app',
  components: {
    footerNav,
    topNav
  }
};
</script>
