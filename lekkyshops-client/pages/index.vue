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
                <v-col cols="7" class="py-0">
                  <div class="title font-weight-bold">Top Categories</div>
                </v-col>
                <v-col cols="5" class="text-right py-0">
                  <v-btn
                    text
                    color="text--primary"
                    class="text-capitalize subtitle-1"
                    to="/categories"
                  >
                    View All
                    <v-icon right> mdi-chevron-right </v-icon>
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
                <v-col cols="7" class="py-0">
                  <div class="title font-weight-bold">Top Vendors</div>
                </v-col>
                <v-col cols="5" class="text-right py-0">
                  <v-btn
                    text
                    color="text--primary"
                    class="text-capitalize subtitle-1"
                    to="/vendors"
                  >
                    View All
                    <v-icon right> mdi-chevron-right </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col v-for="v in 8" :key="v" cols="12" sm="6" md="4" lg="3">
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
        <v-col cols="12" lg="10" class="pb-0">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-row>
                <v-col cols="7" class="py-0">
                  <div class="title font-weight-bold">New Arrivals</div>
                </v-col>
                <v-col cols="5" class="text-right py-0">
                  <v-btn
                    text
                    color="text--primary"
                    class="text-capitalize subtitle-1"
                    to="/products"
                  >
                    View All
                    <v-icon right> mdi-chevron-right </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-slide-group>
                <v-slide-item
                  v-for="(product, p) in products.slice(0, 12)"
                  :key="p"
                  class="ma-3 mb-1"
                >
                  <ProductCard
                    :show-vendor="true"
                    :product="product"
                    :card-width="275"
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
}
</script>

<style></style>
