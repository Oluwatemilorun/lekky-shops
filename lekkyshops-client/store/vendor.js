export const state = () => ({
  vendor: null,
  menu: [
    {
      name: 'about business',
      url: '/account/vendor/about',
      icon: 'mdi-office-building',
    },
    {
      name: 'my services',
      url: '/account/vendor/services',
      icon: 'mdi-chart-bubble',
    },
    {
      name: 'my products',
      url: '/account/vendor/products',
      icon: 'mdi-buffer',
    },
    {
      name: 'my appointments',
      url: '/account/vendor/appointments',
      icon: 'mdi-calendar-multiple',
    },
    {
      name: 'my invoices',
      url: '/account/vendor/invoices',
      icon: 'mdi-file-multiple',
    },
    {
      name: 'income summary',
      url: '/account/vendor/income',
      icon: 'mdi-finance',
    },
    {
      name: 'rating & reviews',
      url: '/account/vendor/reviews',
      icon: 'mdi-chart-line',
    },
  ],
})

export const mutations = {
  setVendor(state, vendor) {
    state.vendor = vendor || null
    // state.isSignedIn = vendor ? true : false;
  },
}
