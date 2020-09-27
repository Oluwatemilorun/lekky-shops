<template>
  <div>
    <v-list>
      <v-subheader class="text-uppercase my-3">
        <span class="title uppercase text-right">Shopping Cart</span>
      </v-subheader>

      <v-list-item
        v-for="(prod, i) in cart"
        :key="i"
        style="border-bottom: 1px solid #ccc"
      >
        <v-list-item-avatar>
          <v-img :src="prod.imageURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <div class="subtitle-2 font-weight-regular text-capitalize mb-2">
            {{ prod.name }}
          </div>
          <div class="subtitle-1 font-weight-thin">
            &#8358;{{ prod.price.toLocaleString() }} x
            {{ prod.quantity }}
          </div>
        </v-list-item-content>
        <v-list-item-icon>
          <v-btn icon color="accent" small @click="removeItem(i)">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-row class="pt-5">
        <v-spacer></v-spacer>
        <v-card outlined flat tile class="pa-2 text-right mr-10">
          <div class="subtitle-2">Total</div>
          <div class="subtitle-1">&#8358; {{ cartTotal.toLocaleString() }}</div>
        </v-card>
      </v-row>
    </v-list>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn
            block
            color="primary"
            dark
            depressed
            large
            to="/checkout"
            :disabled="checkCart"
            >Checkout</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cartCount: 'product/cartCount',
      cart: 'product/cart',
      cartTotal: 'product/cartTotal',
    }),
    checkCart() {
      if (this.cartCount === 0) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    removeItem(index) {
      this.$store.commit('product/removeCartItem', index)
    },
  },
}
</script>

<style></style>
