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
            <div class="headline font-weight-bold text-capitalize">
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
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="my-10 text-center">
            No product/vendor in
            <b>
              <i> {{ category.name }} </i>
            </b>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Products in Category -->
    <v-container>
      <v-row>
        <v-col
          v-for="(item, v) in products"
          :key="v"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <ProductCard :product="item" />
        </v-col>
        <v-col cols="12" class="text-center">
          <v-pagination :value="2" :total-visible="5" :length="10" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Top Vendors in Category -->
    <v-container class="my-5">
      <v-row justify="center">
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-row>
                <v-col cols="6" class="py-0">
                  <div class="title font-weight-bold">
                    Top Vendors in
                    <span class="text-capitalize"> {{ category.name }} </span>
                  </div>
                </v-col>
                <v-col cols="6" class="text-right py-0">
                  <v-btn outlined to="/vendors">
                    View all
                    <v-icon size="16" right> mdi-arrow-right </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-slide-group>
                <v-slide-item v-for="p in 12" :key="p" class="my-3 mx-5">
                  <VendorCard :card-width="300" />
                </v-slide-item>
              </v-slide-group>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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
    products() {
      return this.$store.state.product.products
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
