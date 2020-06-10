<template>
  <v-app v-scroll="onScroll">
    <Toolbar v-if="!isMobile" />
    <MToolbar v-else />
    <v-content>
      <nuxt />
      <Snackbar />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar';
import MToolbar from '~/components/MobileToolbar';
import Footer from '~/components/Footer';
import Snackbar from '~/components/Snackbar';

export default {
  components: { Toolbar, MToolbar, Footer, Snackbar },
  data() {
    return {
      vuetify: this.$vuetify,
      isMobile: false
    };
  },
  computed: {
    hasScrolled() {
      return this.$store.state.scroll.hasScrolled;
    },
    snackbar() {
      return this.$store.getters['snackbar/properties'];
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
