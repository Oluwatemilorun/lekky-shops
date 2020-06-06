export default {
  mode: 'universal',
  head: {
    titleTemplate: '%s - Lekky Shops',
    title: 'Lekky Online Marketplace',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#000' },
  css: [],
  plugins: [],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  axios: {},
  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    defaultAssets: false,
    optionsPath: '~/plugins/vuetify.js'
  },
  build: {
    extend(config, ctx) {}
  }
};
