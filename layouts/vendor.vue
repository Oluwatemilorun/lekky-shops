<template>
  <v-app v-scroll="onScroll">
    <Toolbar v-if="!isMobile" />
    <MToolbar v-else />
    <v-content>
      <nuxt />
    </v-content>
    <Footer />
    <Snackbar />
  </v-app>
</template>

<script>
import Toolbar from '~/components/_vendor/Toolbar';
import MToolbar from '~/components/_vendor/MobileToolbar';
import Footer from '~/components/Footer';
import Snackbar from '~/components/Snackbar';

export default {
  middleware: 'check-vendor',
  components: { Toolbar, MToolbar, Footer, Snackbar },
  computed: {
    hasScrolled() {
      return this.$store.state.scroll.hasScrolled;
    }
  },
  mounted() {
    this.isMobile = !!this.$vuetify.breakpoint.mdAndDown;
  },
  methods: {
    onScroll(e) {
      this.$store.commit('scroll/onScroll', e);
    }
  }
};
</script>

<style></style>
