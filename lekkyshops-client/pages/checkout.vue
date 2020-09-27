<template>
  <div class="checkout">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" lg="11">
          <v-card tile elevation="2" class="py-5 px-10">
            <v-row>
              <v-col cols="12" md="6" lg="4">
                <v-card flat>
                  <div class="title text-uppercase mb-10">Shopping Cart</div>
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
                        <div
                          class="subtitle-2 font-weight-regular text-capitalize mb-2"
                        >
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
                      <v-spacer />
                      <v-card outlined flat tile class="pa-2 text-right">
                        <span class="grey--text text--darken-1 d-block">
                          Total
                        </span>
                        &#8358; {{ cartTotal }}
                      </v-card>
                    </v-row>
                  </v-list>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-card tile class="pa-5" flat color="primary lighten-1" dark>
                  <div class="title text-uppercase mb-1">Address Details</div>
                  <v-form ref="form" v-model="addressForm">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="name"
                          label="Full Name"
                          :rules="[
                            (v) => !!v || 'Full Name is required',
                            (v) =>
                              /^\w+\s\w+$/.test(v) ||
                              'Must be at least two names',
                          ]"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="phone"
                          label="Phone Number"
                          :counter="10"
                          prefix="+234"
                          :rules="[
                            (v) => !!v || 'Phone Number is required',
                            (v) => /^\d{10}$/.test(v) || 'Must be 10 digits',
                          ]"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="email"
                          label="E-mail"
                          :rules="[
                            (v) => !!v || 'Email is required',
                            (v) => emailValidation(v) || 'Email is invalid',
                          ]"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="address"
                          label="Address"
                          :rules="[(v) => !!v || 'Address is required']"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="city"
                          label="City"
                          :rules="[(v) => !!v || 'City is required']"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="state"
                          label="State"
                          :rules="[(v) => !!v || 'State is required']"
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-card tile class="pa-5" flat color="primary lighten-1" dark>
                  <div class="title text-uppercase mb-">Card Details</div>
                  <v-card
                    class="px-5 pb-0 pt-2 mt-5"
                    tile
                    color="primary lighten-2"
                  >
                    <v-icon x-large dark> mdi-credit-card-multiple </v-icon>
                    <div class="title py-1">
                      {{
                        card.number.replace(/\d{4}/g, (d) => d + ' ' + '&nbsp;')
                      }}
                    </div>
                    <v-row>
                      <v-col cols="9">
                        <div class="subtitle-1">
                          {{ card.holder }}
                        </div>
                      </v-col>
                      <v-col cols="3">
                        <div class="subtitle-2">
                          {{ card.exp }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-form v-model="cardForm">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="card.holder"
                          label="Card Holder"
                          :rules="[
                            (v) => !!v || 'Card Holder is required',
                            (v) =>
                              /^\w+\s\w+$/.test(v) ||
                              'Must be at least two names',
                          ]"
                        />
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-text-field
                          v-model="card.number"
                          label="Card Number"
                          :counter="16"
                          :rules="[
                            (v) => !!v || 'Card Number is required',
                            (v) => /^\d{16}$/.test(v) || 'Must be 16 digits',
                          ]"
                        />
                      </v-col>
                      <v-col cols="6" class="py-0">
                        <v-text-field
                          v-model="card.exp"
                          label="Exp Date"
                          placeholder="MM/YY"
                          :rules="[
                            (v) => !!v || 'Expiry Date is required',
                            (v) =>
                              /^\d{2}\/\d{2}$/.test(v) ||
                              'Use the format: MM/YY',
                          ]"
                        />
                      </v-col>
                      <v-col cols="6" class="pt-0">
                        <v-text-field
                          v-model="card.ccv"
                          label="CCV"
                          :counter="3"
                          :rules="[
                            (v) => !!v || 'CVV is required',
                            (v) => /^\d{3}$/.test(v) || 'Must be 3 digits',
                          ]"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-btn
                          x-large
                          block
                          color="white"
                          light
                          :disabled="!addressForm || !cardForm || !cartTotal"
                        >
                          Pay &#8358;{{ cartTotal }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { emailValidation } from '~/assets/js/validation'

export default {
  data: () => ({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    card: {
      holder: '',
      number: '',
      exp: '',
      ccv: '',
    },
    addressForm: false,
    cardForm: false,
  }),
  computed: {
    ...mapGetters({
      cart: 'product/cart',
      cartTotal: 'product/cartTotal',
    }),
  },
  methods: {
    emailValidation,
    removeItem(index) {
      this.$store.commit('product/removeCartItem', index)
    },
  },
  head() {
    return {
      title: 'Check Out',
    }
  },
}
</script>

<style></style>
