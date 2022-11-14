import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import en from './locales/en.json'
import vi from './locales/vi.json'
import zh from './locales/zh.json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
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
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-lodash'
  ],
  buildModules: ['nuxt-typed-router'],

  // i18n config
  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'zh',
      fallbackLocale: 'zh',
      messages: {
        en,
        vi,
        zh
      }
    }
  },

  // Vite config
  vite: {
    plugins: [
      eslintPlugin(),
      Components({
        resolvers: [VantResolver()]
      })
    ]
  },

  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.API_ENDPOINT
    }
  }
})
