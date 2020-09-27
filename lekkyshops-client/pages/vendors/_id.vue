<template>
  <div id="vendor">
    <v-sheet color="grey lighten-4" tile height="200" width="100%">
      <v-img src="/img/clothing.jpg" height="100%" width="100%">
        <v-row justify="end" align="end" class="fill-height pb-3 pr-7">
          <v-btn color="white" large style="text-transform: none" depressed>
            <v-icon left size="24" color="primary"> mdi-heart-outline </v-icon>
            Add to Favorite
          </v-btn>
        </v-row>
      </v-img>
    </v-sheet>
    <v-sheet color="white" tile elevation="2">
      <v-container fluid>
        <v-row justify="center">
          <v-col lg="11">
            <v-row>
              <v-col cols="2" class="pt-0">
                <div style="margin-top: -75px">
                  <v-avatar size="180" style="border: 5px solid white">
                    <v-img src="/img/bracelet.jpg" />
                  </v-avatar>
                </div>
              </v-col>
              <v-col cols="4" class="pt-0">
                <div class="headline font-weight-bold pb-2 ml-3">
                  Rare Collections
                </div>
                <v-rating
                  :value="4.3"
                  color="primary"
                  background-color="primary"
                  dense
                  size="24"
                  half-increments
                  class="ml-3"
                />
                <v-btn
                  v-for="(social, a) in socials"
                  :key="a"
                  text
                  large
                  color="primary"
                  class="mr-2 text-capitalize subtitle-1"
                >
                  <v-icon left :color="social.color">
                    mdi-{{ social.name }}
                  </v-icon>
                  {{ social.name }}
                </v-btn>
              </v-col>
              <v-col cols="6">
                <div class="subtitle-1">
                  Some description about your store goes here so your visitors
                  can know what offers you've got in stock for them.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt.
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container fluid class="pt-5">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-tabs grow class="primary">
            <v-tab
              v-for="i in ['Home', 'All Items (82)', 'Reviews (26)', 'About']"
              :key="i"
              class="text-uppercase font-weight-bold subtitle-1"
            >
              {{ i }}
            </v-tab>

            <v-tab-item class="px-2">
              <!-- Top Selling -->
              <v-container fluid class="pt-5">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <div class="title font-weight-medium">Top Selling</div>
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
              </v-container>
              <!-- New Arrivals -->
              <v-container fluid class="pt-5">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <div class="title font-weight-medium">New Arrivals</div>
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
              </v-container>
            </v-tab-item>
            <v-tab-item class="px-2">
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
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row justify="center">
                  <v-col v-for="v in 7" :key="v" cols="11">
                    <ReviewCard />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item class="px-2">
              <v-container fluid class="pt-5">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <div class="title font-weight-medium">
                      About Rare Collections
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <p>
                      Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                      natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nulla consequat massa
                      quis enim. Donec pede justo, fringilla vel, aliquet nec,
                      vulputate eget, arcu.
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    socials: [
      { name: 'facebook', color: 'blue darken-3' },
      { name: 'twitter', color: 'blue' },
      { name: 'whatsapp', color: 'green' },
    ],
  }),
  computed: {
    products() {
      return this.$store.state.product.products
    },
  },
}
</script>

<style>
.shop-avatar {
  border: 5px solid white;
}
</style>
