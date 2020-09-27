import products from '@/data/products.json'

export const state = () => ({
  products,
  cart: [],
})

export const getters = {
  cart: (state) => state.cart,
  cartCount: (state) => state.cart.length,
  cartTotal: (state) => {
    if (!state.cart.length) {
      return 0
    }
    return state.cart.reduce((ac, next) => ac + next.quantity * next.price, 0)
  },
}

export const mutations = {
  addToCart(state, payload) {
    let itemfound = false
    state.cart.forEach((el) => {
      if (el.id === payload.id) {
        el.quantity += payload.quantity
        itemfound = true
      }
    })
    if (!itemfound) {
      state.cart.push(payload)
    }
  },
  removeCartItem: (state, index) => {
    state.cart.splice(index, 1)
  },
}
