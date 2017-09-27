const webpack = require('webpack')

require('dotenv').config()

module.exports = {

  head: {
    title: 'cms-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js driven frontend for the custom Laravel driven CMS' }
    ],
    script: [
      // { src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#4DC0FF' },

  /* env: {
    baseUrl: process.env.API_URL || 'http://localhost:8000'
  }, */

  router: {
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    middleware: ['auth']
  },

  css: [
    '@/assets/scss/global/_global.scss',
    '@/assets/scss/admin.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.core.css'
  ],

  modules: [
    '@nuxtjs/dotenv', // Usage: context.env.key or process.env.key
    '@nuxtjs/auth',
    // ...Axios module should be included AFTER @nuxtjs/auth
    '@nuxtjs/axios'
  ],

  auth: {
    /* auth options */
  },

  axios: {
    credentials: true,
    baseURL: process.env.API_URL || 'http://localhost:8000',
    browserBaseURL: '',
    requestInterceptor: (config, { store }) => {
      if (store.state.auth.token) {
        config.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token
      }
      return config
    }
  },

  plugins: [
    { src: '~/plugins/global.js' },
    { src: '~/plugins/browser-only', ssr: false }
  ],

  extend (config) {
    config.resolve.alias['Mixins'] = '~/assets/js/mixins'
  },

  build: {
    vendor: ['lodash'],
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    extend (config, ctx) {
      // Have to use compiler-included build to get some broseer only components
      // see: https://github.com/nuxt/nuxt.js/issues/1142
      config.resolve.alias['vue'] = 'vue/dist/vue.common'

      /*
      ** Run ESLINT on save
      */
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
