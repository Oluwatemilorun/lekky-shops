<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    light
    temporary
    right
    width="400"
    hide-overlay
    floating
  >
    <v-subheader class="text-uppercase mt-3">
      <span class="subtitle-1 uppercase">Cart</span>
      <v-spacer />
      <v-btn icon @click.stop="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-subheader>
    <v-divider />

    <v-list>
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
          <v-btn icon color="error" small @click="removeItem(i)">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-row v-if="!checkCart" class="pt-5">
        <v-spacer />
        <v-card outlined flat tile class="pa-2 text-right mr-10">
          <div class="subtitle-2">Total</div>
          <div class="subtitle-1">&#8358; {{ cartTotal.toLocaleString() }}</div>
        </v-card>
      </v-row>
      <v-row v-else justify="center" align="center">
        <div class="py-12 my-12">Your cart is empty</div>
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
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    drawer: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
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
