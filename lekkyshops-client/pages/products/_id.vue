<template>
  <div>
    <v-container fluid class="tertiary text-capitalize">
      <v-breadcrumbs :items="breadcrumb" />
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="6">
              <v-carousel
                v-model="gallery"
                hide-delimiters
                hide-delimiter-background
                :show-arrows="false"
                height="400"
              >
                <v-carousel-item v-for="(img, v) in prodImages" :key="v">
                  <v-img :src="img" height="100%" />
                </v-carousel-item>
              </v-carousel>

              <!-- Image thumbnails -->
              <v-row>
                <v-col cols="12">
                  <v-slide-group show-arrows>
                    <v-slide-item
                      v-for="(pic, d) in prodImages"
                      :key="d"
                      class="ma-2"
                    >
                      <v-card
                        flat
                        tile
                        height="100"
                        width="100"
                        @click="gallery = d"
                      >
                        <v-img :src="pic" height="100%" />
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-card flat tile class="px-5">
                <div class="title text-uppercase">
                  {{ product.name }}
                </div>
                <div class="py-2">
                  <span class="text-h4 font-weight-bold mr-2">
                    &#8358; {{ product.price.toLocaleString() }}
                  </span>
                  <span class="title">
                    <del
                      >&#8358;
                      {{ (product.price * 1.25).toLocaleString() }}</del
                    >
                  </span>
                </div>
                <div class="subtitle-1 pb-3">
                  <v-rating
                    :value="product.rating"
                    color="primary"
                    background-color="primary"
                    dense
                    size="24"
                    half-increments
                    class="d-inline mr-2"
                  />

                  (<span class="font-weight-bold">78</span> ratings)
                </div>

                <v-divider />

                <v-card link flat tile color="transparent" class="my-3">
                  <v-row align="center">
                    <v-col cols="auto" class="py-0">
                      <v-avatar size="35">
                        <v-img src="/img/clothing.jpg" />
                      </v-avatar>
                    </v-col>
                    <v-col cols="auto" class="py-0">
                      <div class="subtitle-2 font-weight-medium text-uppercase">
                        {{ product.vendor }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

                <v-divider />

                <div class="py-2">
                  {{ product.short_description }}
                </div>

                <div class="py-2">
                  <div class="subtitle-2 font-weight-bold">Quantity:</div>
                  <v-btn
                    color="primary"
                    depressed
                    tile
                    @click="quantity > 1 && quantity--"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <v-btn color="primary" outlined large tile>
                    {{ quantity }}
                  </v-btn>
                  <v-btn color="primary" depressed tile @click="quantity++">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>

                <v-btn
                  block
                  x-large
                  color="primary"
                  depressed
                  @click="addToCart"
                >
                  Add to cart
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Full Description, Shipping, Reviews -->
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card flat>
            <v-tabs grow height="55">
              <v-tab
                v-for="item in ['Description', 'Shipping', 'Reviews']"
                :key="item"
              >
                {{ item }}
              </v-tab>
              <!-- Description -->
              <v-tab-item class="mx-10 pt-10">
                <p>
                  Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
                  ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet
                  orci eget eros faucibus tincidunt. Duis leo. Sed fringilla
                  mauris sit amet nibh.
                </p>
              </v-tab-item>

              <!-- Shipping-->
              <v-tab-item class="mx-10 py-5">
                <p>Shipping...</p>
              </v-tab-item>

              <!-- Reviews -->
              <v-tab-item class="mx-10 py-5">
                <v-row>
                  <v-col cols="12" sm="7">
                    <v-row>
                      <v-col v-for="(rev, r) in reviews" :key="r" cols="12">
                        <ReviewCard :review="rev" />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="5">
                    <v-expand-transition>
                      <v-card v-show="reviewBox" flat>
                        <v-form v-model="ReviewForm">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="review.name"
                                label="Name"
                                :rules="[(v) => !!v || 'Name is required']"
                              />
                            </v-col>
                            <v-col cols="12">
                              <v-select
                                v-model="review.rating"
                                :items="[1, 2, 3, 4, 5]"
                                label="Rating"
                                :rules="[(v) => !!v || 'Rating is required']"
                                dense
                              />
                            </v-col>
                            <v-col cols="12">
                              <v-textarea
                                v-model="review.text"
                                label="Review"
                                :rows="2"
                                :rules="[(v) => !!v || 'Review is required']"
                              />
                            </v-col>
                            <v-col cols="12">
                              <v-btn
                                block
                                color="primary"
                                class="mt-2"
                                depressed
                                :disabled="!ReviewForm"
                                @click="addReview"
                              >
                                Submit
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card>
                    </v-expand-transition>

                    <v-footer color="transparent" paddless>
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        small
                        @click="reviewBox = !reviewBox"
                      >
                        {{ reviewBox ? 'Close' : 'Add review' }}
                      </v-btn>
                    </v-footer>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      gallery: 0,
      quantity: 1,
      colors: null,
      cart: 0,
      reviewBox: false,
      review: {
        name: '',
        rating: '',
        text: '',
      },
      reviews: [
        {
          name: 'Amanda Bloom',
          rating: 4.2,
          text: 'Awesome product. My friends have been fighting to borrow it.',
        },
        {
          name: 'Jane Doe',
          rating: 5,
          text: 'Product was good ust as it was in the picture.',
        },
      ],
      ReviewForm: false,
      tempcart: [],
    }
  },
  computed: {
    products() {
      return this.$store.state.product.products
    },
    product() {
      return this.products.find((el) => el.id === this.id)
    },
    breadcrumb() {
      return [
        { text: 'Home', to: '/', disabled: false },
        { text: 'Vendors', to: '/vendors', disabled: false },
        { text: this.product.vendor, to: '/vendor/1', disabled: false },
        {
          text: this.product.name,
          to: '',
          disabled: true,
        },
      ]
    },
    prodImages() {
      return [
        this.product.imageURL,
        '/img/product/img1.jpg',
        '/img/product/img3.jpg',
        '/img/product/img4.jpg',
        '/img/product/img5.jpg',
      ]
    },
  },
  methods: {
    addToCart() {
      const item = this.product
      item.quantity = this.quantity
      this.$store.commit('product/addToCart', item)
    },
    addReview() {
      this.reviews.push(this.review)
      this.review = {}
      this.reviewBox = false
    },
  },
  head() {
    const text = this.product.name
    const title = text.replace(/^\w|\s\w/g, (w) => w.toUpperCase())
    return { title }
  },
}
</script>

<style></style>
