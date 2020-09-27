<template>
  <div>
    <v-sheet flat tile height="175" color="primary lighten-2">
      <v-img :src="category.cover" height="100%" class="cover">
        <v-row
          justify="center"
          align="end"
          class="fill-height white--text overlay"
        >
          <v-col cols="11">
            <div class="display-1 font-weight-bold text-capitalize">
              {{ category.name }}
            </div>
            <v-breadcrumbs :items="breadcrumbs" dark class="px-0 py-2">
              <template v-slot:item="{ item }">
                <v-chip
                  class="text-capitalize"
                  :to="item.to"
                  :disabled="item.disabled"
                  depressed
                >
                  {{ item.text }}
                </v-chip>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-img>
    </v-sheet>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = await params.slug
    return { slug }
  },
  computed: {
    categories() {
      return this.$store.state.category.categories
    },
    category() {
      return this.categories.find((el) => el.slug === this.slug)
    },
    breadcrumbs() {
      return [
        { text: 'home', to: '/' },
        { text: 'categories', to: '/categories' },
        {
          text: this.category.name,
          to: `/categories/${this.category.slug}`,
          disabled: true,
        },
      ]
    },
  },
  head() {
    const text = this.category.name
    const title = text.replace(/^\w|(\s\w)/g, (str) => str.toUpperCase())
    return {
      title,
    }
  },
}
</script>

<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
