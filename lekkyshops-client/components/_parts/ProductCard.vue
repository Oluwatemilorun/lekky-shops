<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 6 : 0"
        tile
        style="transition: all ease-in-out 0.3s"
        outline
        :width="cardWidth"
      >
        <v-card flat tile :to="`/products/${product.id}`">
          <v-img :src="product.imageURL" height="220" class="prod-img" />
        </v-card>
        <v-card-text class="py-1">
          <v-list-item-title
            class="subtitle-1 font-weight-medium text--primary text-capitalize"
          >
            {{ product.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="subtitle-1 font-weight-medium">
              &#8358;{{ product.price.toLocaleString() }}
            </span>
            <span class="font-weight-thin caption">
              <del> &#8358;{{ (product.price * 1.25).toLocaleString() }} </del>
            </span>
          </v-list-item-subtitle>
        </v-card-text>
        <v-card-actions v-if="hover" class="pa-2">
          <v-btn
            color="primary"
            width="75%"
            tile
            depressed
            class="d-inline mx-0"
          >
            Add to cart
          </v-btn>
          <v-btn
            color="primary"
            outlined
            tile
            depressed
            width="20%"
            class="d-inline mx-1"
            :loading="loading"
            @click="addToFavorite()"
          >
            <v-icon>{{ favIcon }}</v-icon>
          </v-btn>
        </v-card-actions>
        <div v-else class="pb-6 pt-7" />
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
    loading: false,
  }),
  methods: {
    addToFavorite() {
      this.loading = true
      setTimeout(() => {
        this.$store.commit('snackbar/show', {
          text: 'Added to favourites',
          icon: 'success',
        })
      }, 800)
      this.favIcon = 'mdi-heart'
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
  },
}
</script>
<style>
.prodcard {
  transition: all ease-in-out 0.3s;
}
</style>
