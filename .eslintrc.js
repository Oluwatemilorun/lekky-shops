module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    semi: [2, 'always'],
	'no-console': process.env.NODE_ENV === "production" ? "warn" : "off",
	'no-debugger': process.env.NODE_ENV === "production" ? "warn" : "off",
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 5,
      'multiline': {
        'max': 2,
        'allowFirstLine': false
      }
    }],
    'vue/html-indent': ['warn', 2, {}],
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/html-self-closing': ['error', { html: { void: 'always' } }]
  }
}
