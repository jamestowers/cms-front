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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#4DC0FF' },

  env: {
    baseUrl: process.env.API_URL || 'http://localhost:8000'
  },

  router: {
    linkActiveClass: '',
    linkExactActiveClass: 'active'
  },

  css: [
    '@/assets/scss/global/_global.scss',
    '@/assets/scss/admin.scss'
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    credentials: false,
    baseURL: process.env.API_URL || 'http://localhost:8000',
    browserBaseURL: ''
  },

  plugins: [
    { src: '~/plugins/global.js' },
    { src: '~/plugins/browser-only', ssr: false }
  ],

  build: {
    // vendor: ['axios'],
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
