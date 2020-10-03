<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    color="white"
    temporary
    left
    hide-overlay
    floating
  >
    <v-toolbar dense flat>
      <v-spacer />
      <v-btn icon @click.stop="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list dense>
      <v-subheader class="text-uppercase"> Popular Categories </v-subheader>

      <v-list-item
        v-for="(item, i) in [...categories]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6)"
        :key="i"
        :to="`/categories/${item.slug}`"
        exact
      >
        <v-list-item-title
          class="subtitle-2 text-capitalize"
          v-text="item.name"
        />
      </v-list-item>
      <v-list-item exact to="/categories">
        <v-list-item-content>
          <v-list-item-title class="subtitle-2">
            More Categories
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon size="18">mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-list dense>
      <v-subheader class="text-uppercase"> More Links </v-subheader>
      <v-list-item v-for="link in links" :key="link.text" :to="link.href" exact>
        <v-list-item-title class="subtitle-2 text-capitalize">
          {{ link.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
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
        return this.$emit('input', value)
      },
    },
    links() {
      return this.$store.state.links
    },
    categories() {
      return this.$store.state.category.categories
    },
  },
}
</script>

<style></style>
