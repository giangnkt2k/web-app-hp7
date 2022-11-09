import en from "./locales/en.json";
import vi from "./locales/vi.json";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  experimental: {
    externalVue: true,
  },
  nitro: {
    preset: "firebase",
  },
  typescript: {
    shim: false,
  },

  // CSS files
  css: ["~/assets/scss/app.scss"],

  modules: [
    "nuxt-windicss",
    "@pinia/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "nuxt-lodash",
  ],
  buildModules: ["nuxt-typed-router"],

  // i18n config
  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en",
      messages: {
        en,
        vi,
      },
    },
  },

  // Vite config
  vite: {
    plugins: [
      Components({
        resolvers: [VantResolver()],
      }),
    ],
  },
});
