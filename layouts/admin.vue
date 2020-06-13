<template>
  <v-app>
    <Toolbar />
    <Sidenav />
    <v-content>
      <nuxt />
    </v-content>

    <LoadingDIalog />
    <Snackbar />
  </v-app>
</template>

<script>
import Toolbar from '~/components/_admin/Toolbar';
import Sidenav from '~/components/_admin/Sidenav';
import Snackbar from '~/components/Snackbar';
import LoadingDIalog from '~/components/LoadingDIalog';

export default {
  middleware: 'admin',
  components: { Toolbar, Sidenav, Snackbar, LoadingDIalog },
  computed: {
    hasScrolled() {
      return this.$store.state.scroll.hasScrolled;
    }
    // snackbar () {
    // 	return this.$store.getters['snackbar/properties'];
    // },
    // showSnackbar: {
    // 	get () {
    // 		return this.$store.state.snackbar.show;
    // 	},
    // 	set (newVal) {
    // 		this.$store.commit('snackbar/toggle', newVal);
    // 	}
    // },
  },
  methods: {
    onScroll(e) {
      this.$store.commit('scroll/onScroll', e);
    }
  }
  // beforeRouteLeave (to, from, next) {
  // 	this.$store.commit('toolbar/show');
  // 	next();
  // },
};
</script>

<style></style>
