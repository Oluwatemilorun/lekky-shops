<template>
  <v-sheet tile width="100%">
    <v-carousel
      cycle
      height="400"
      hide-delimiters
      vertical
      vertical-delimiters
      delimiter-icon="mdi-minus"
      :show-arrows="false"
      reverse
      :interval="10000"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet color="grey lighten-3">
          <v-img :src="slide" height="400">
            <v-row justify="center" align="center" class="fill-height">
              <v-col cols="10" class="white--text">
                <div class="text-uppercase display-1 font-weight-black">
                  Buy Wholesale
                </div>
                <div class="headline font-weight-bold my-2">
                  Lowest Prices Guaranteed!
                </div>
                <div class="subtitle-1 text-capitalize mb-3">
                  Post buy requests and get multiple quotes
                </div>
                <v-btn depressed color="white" light large>
                  Explore
                  <v-icon right size="17"> mdi-arrow-right </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-img>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        '/img/slide-shoes.jpg',
        '/img/shopping.jpg',
        '/img/clothing.jpg',
      ],
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
  },
}
</script>
