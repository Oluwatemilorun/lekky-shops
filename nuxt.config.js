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
  router: {
    middleware: ['cookie', 'check-auth']
    // extendRoutes(routes, resolve) {
    // let accountSignup = routes.findIndex(route => route.name === 'account-register');
    // routes[accountSignup].components = { default: routes[accountSignup].component }
    // routes[accountSignup].components.register = resolve(__dirname, 'components/_account/Register.vue');
    // routes[accountSignup].chunkNames = { register: 'components/_account/Register' }

    // let accountLogin = routes.findIndex(route => route.name === 'account-login');
    // routes[accountLogin].components = { default: routes[accountLogin].component }
    // routes[accountLogin].components.login = resolve(__dirname, 'components/_account/Login.vue');
    // routes[accountLogin].chunkNames = { login: 'components/_account/Login' }
    // }
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
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? `https://cutsandplaits.herokuapp.com`
        : `http://localhost:${process.env.PORT || 3000}`,
    credentials: true
  },
  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    defaultAssets: false,
    optionsPath: '~/plugins/vuetify.options.js'
  },
  build: {
    // vendor: ['axios'],
    extractCSS: true
    // extend(config, ctx) {
    // Run ESLint on save
    // if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //         enforce: "pre",
    //         test: /\.(js|vue)$/,
    //         loader: "eslint-loader",
    //         exclude: /(node_modules)/
    //     });
    // }
    // }
  },
  serverMiddleware: [
    // 'redirect-ssl',
    '~/server/index.js'
  ]
};
