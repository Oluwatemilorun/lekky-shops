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
    <v-sheet color="white" tile flat>
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
                <div class="headline pb-2 ml-3">Rare Collections</div>
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

    <v-container fluid>
      <v-row justify="center">
        <v-col lg="11">
          <v-row>
            <!-- Main -->
            <v-col id="main" cols="9">
              <v-tabs
                grow
                hide-slider
                active-class="secondary"
                height="60"
                class="primary"
              >
                <v-tab
                  v-for="i in [
                    'All Items (82)',
                    'Skirts',
                    'Bracelets',
                    'Bags',
                    'Reviews (26)',
                  ]"
                  :key="i"
                  class="text-capitalize"
                >
                  {{ i }}
                </v-tab>

                <v-tab-item class="px-2">
                  <v-row>
                    <v-col v-for="v in 12" :key="v" cols="4">
                      <ProductCard />
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item class="px-2">
                  <v-row>
                    <v-col v-for="v in 12" :key="v" cols="4">
                      <ProductCard :product="skirt" />
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item class="px-2">
                  <v-row>
                    <v-col v-for="v in 12" :key="v" cols="4">
                      <ProductCard :product="bracelet" />
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item class="px-2">
                  <v-row>
                    <v-col v-for="v in 12" :key="v" cols="4">
                      <ProductCard :product="bag" />
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item>
                  <v-row justify="center">
                    <v-col v-for="v in 7" :key="v" cols="12">
                      <v-card flat outlined class="ma-2">
                        <div class="px-5 py-3">
                          <v-avatar color="primary" size="50">
                            <span class="white--text font-weight-bold headline">
                              A
                            </span>
                          </v-avatar>
                          <span class="subtitle-1 font-weight-medium ml-3">
                            Amanda Bennett
                          </span>
                          <v-rating
                            dense
                            size="16"
                            background-color="primary"
                            class="d-inline pl-5"
                            half-increments
                            :value="4"
                            readonly
                          />
                        </div>
                        <v-divider />
                        <v-card-text class="primary--text subtitle-1">
                          This store is one of the very best on this website.
                          All the products are just the way they were in pics.
                          My favorite store anyday any time.
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs>
            </v-col>

            <!-- Sidebar -->
            <v-col cols="3">
              <v-card outlined class="text-center">
                <div class="subtitle-1 py-3 font-weight-medium">Shop Owner</div>
                <v-divider />
                <v-card-text>
                  <div>
                    <v-avatar size="80">
                      <v-img src="/img/hair-dresser.jpeg" />
                    </v-avatar>
                  </div>
                  <div class="pt-3 primary--text subtitle-2 font-weight-bold">
                    Jane Edet
                  </div>
                  <div class="subtitle-2 font-weight-thin">
                    <v-icon small color="primary"> mdi-map-marker </v-icon>
                    Lekki, Lagos, NG
                  </div>
                  <div>
                    <v-rating
                      :value="4.7"
                      half-increments
                      dense
                      size="16"
                      background-color="primary"
                      class="d-inline"
                    />
                    (16 ratings)
                  </div>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn text block color="primary">
                    <v-icon small left> mdi-phone-outline </v-icon>
                    contact seller
                  </v-btn>
                </v-card-actions>
              </v-card>

              <v-card outlined class="my-5">
                <div class="subtitle-1 pa-3 font-weight-medium">
                  Shop Categories
                </div>
                <v-divider />
                <v-list color="transparent" flat>
                  <v-list-item
                    v-for="m in ['Skirts', 'Bracelettes', 'Shirts', 'Bags']"
                    :key="m"
                  >
                    <v-list-item-content>
                      {{ m }}
                    </v-list-item-content>
                    <v-list-item-action> (54) </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductCard from '~/components/_parts/ProductCard'

export default {
  components: { ProductCard },
  data: () => ({
    socials: [
      { name: 'facebook', color: 'blue darken-3' },
      { name: 'twitter', color: 'blue' },
      { name: 'gmail', color: 'red' },
      { name: 'linkedin', color: 'blue darken-4' },
      { name: 'whatsapp', color: 'green' },
    ],
    skirt: {
      name: 'Blue High Waist Skirt',
      price: 150,
      imageURL: '/img/blue-skirt.jpg',
      vendor: {
        name: 'Rare Collections',
        imageURL: '/img/clothing.jpg',
      },
    },
    bracelet: {
      name: 'Blue Loop Bracelet',
      price: 225,
      imageURL: '/img/bracelet-2.jpg',
      vendor: {
        name: 'Rare Collections',
        imageURL: '/img/clothing.jpg',
      },
    },
    bag: {
      name: 'Brown Leather Fashion Bag',
      price: 150,
      imageURL: '/img/bag.jpg',
      vendor: {
        name: 'Rare Collections',
        imageURL: '/img/clothing.jpg',
      },
    },
  }),
}
</script>

<style>
.shop-avatar {
  border: 5px solid white;
}
</style>
