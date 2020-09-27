<template>
  <div>
    <!-- Carousel -->
    <Carousel />

    <!-- Top Categories -->
    <v-container fluid class="pt-5 mx-lg-10">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-row>
                <v-col cols="6" class="py-0">
                  <div class="headline font-weight-bold">Top Categories</div>
                </v-col>
                <v-col cols="6" class="text-right py-0">
                  <v-btn outlined to="/categories">
                    View all
                    <v-icon size="18" right> mdi-arrow-right </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="12">
              <v-row>
                <v-col
                  v-for="(category, e) in [...categories]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 6)"
                  :key="e"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <CategoryCard :category="category" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Featured Vendors -->
    <v-container fluid class="pt-5 mx-lg-10">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-row>
                <v-col cols="6" class="py-0">
                  <div class="headline font-weight-bold">Featured Vendors</div>
                </v-col>
                <v-col cols="6" class="text-right py-0">
                  <v-btn outlined to="/vendors">
                    View all
                    <v-icon size="18" right> mdi-arrow-right </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col v-for="v in 8" :key="v" cols="6" md="4" lg="3">
                  <VendorCard />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- New Arrivals -->
    <v-container fluid class="pt-5 mx-lg-10">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-row>
                <v-col cols="6" class="py-0">
                  <div class="headline font-weight-bold">New Arrivals</div>
                </v-col>
                <v-col cols="6" class="text-right py-0">
                  <v-btn outlined to="/products">
                    View all
                    <v-icon size="18" right> mdi-arrow-right </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-slide-group>
                <v-slide-item
                  v-for="(product, p) in products.slice(0, 12)"
                  :key="p"
                  class="ma-3"
                >
                  <ProductCard
                    :show-vendor="true"
                    :product="product"
                    :card-width="300"
                  />
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
  data: () => ({
    //
  }),
  computed: {
    categories() {
      return this.$store.state.category.categories
    },
    products() {
      return this.$store.state.product.products
    },
  },
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>

<style></style>
