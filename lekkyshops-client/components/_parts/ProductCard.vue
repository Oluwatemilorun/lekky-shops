<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card
        :flat="!hover"
        tile
        :color="hover ? 'white' : 'transparent'"
        class="pa-2 prodcard"
        :width="cardWidth"
      >
        <v-img :src="product.imageURL" height="220" class="pb-3 prod-img">
          <v-row justify="center" align="end" class="fill-height">
            <div class="prod-overlay">
              <v-btn
                fab
                color="white"
                small
                class="mx-1"
                depressed
                @click="favIcon = 'mdi-heart'"
              >
                <v-icon color="primary"> {{ favIcon }} </v-icon>
              </v-btn>
              <v-btn
                fab
                color="white"
                small
                class="mx-1"
                depressed
                :to="`/products/${product.id}`"
              >
                <v-icon color="primary"> mdi-cart-outline </v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-img>
        <v-card-text class="pa-1 pt-2">
          <v-list-item-title
            class="subtitle-2 font-weight-medium primary--text text-capitalize"
          >
            {{ product.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="primary--text subtitle-1 font-weight-medium">
              &#8358;<b>{{ product.price.toLocaleString() }}</b>
            </span>
            <span class="pl-1 font-weight-thin">
              <del> &#8358;{{ (product.price * 1.25).toLocaleString() }} </del>
            </span>
          </v-list-item-subtitle>
        </v-card-text>
        <v-card v-show="showVendor" to="/vendor" flat tile color="transparent">
          <v-row align="center">
            <v-col cols="2" class="py-0">
              <v-avatar size="35">
                <v-img src="/img/clothing.jpg" />
              </v-avatar>
            </v-col>
            <v-col cols="10" class="py-0">
              <div class="subtitle-2 font-weight-medium text-capitalize">
                {{ product.vendor }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        name: 'Summer High-Waist Skirt',
        price: 300,
        imageURL: '/img/bag.jpg',
        vendor: 'Rare Collections',
      }),
    },
    cardWidth: {
      type: [Number, String],
      default: () => '100%',
    },
    showVendor: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    favIcon: 'mdi-heart-outline',
  }),
}
</script>
<style>
.prodcard {
  transition: all ease-in-out 0.3s;
}

.prod-img .prod-overlay {
  opacity: 0;
  transition: opacity ease-in-out 0.3s;
}
.prod-img:hover .prod-overlay {
  opacity: 1;
}
</style>
