import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  experimental: {
    externalVue: true
  },
  typescript: {
    shim: false,
    typeCheck: true
  },

  app: {
    // Head
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }
      ]
    }
  },

  // CSS files
  css: ['~/assets/scss/app.scss', '~/assets/scss/icons.scss'],

  modules: [
    'nuxt-windicss',
    '@pinia/nuxt',
    '@nuxtjs/robots',
    '@vueuse/nuxt',
    'nuxt-lodash'
  ],
  buildModules: ['nuxt-typed-router'],

  // Vite config
  vite: {
    plugins: [
      eslintPlugin(),
      Components({
        resolvers: [VantResolver()]
      })
    ],
    ssr: {
      noExternal: ['vant']
    }
  },

  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.API_ENDPOINT
    }
  }
})
