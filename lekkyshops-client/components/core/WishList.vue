<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    light
    temporary
    right
    width="400"
    hide-overlay
    floating
  >
    <v-subheader class="text-uppercase mt-3">
      <span class="subtitle-1 uppercase">Wishlist</span>
      <v-spacer />
      <v-btn icon @click.stop="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-subheader>
    <v-divider />
    <v-row justify="center" align="center">
      <div class="my-12 py-12">Your wishlist is empty</div>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    drawer: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    close() {
      this.$emit('update:drawer', false)
    },
  },
}
</script>

<style></style>
