import { createI18n } from 'vue-i18n'
import en from '~~/locales/en.json'
import vi from '~~/locales/vi.json'
import zh from '~~/locales/zh.json'

export const i18n = createI18n({
  fallbackFormat: 'zh',
  locale: 'zh',
  messages: {
    en, vi, zh
  }
})

export default defineNuxtPlugin(() => {
  return {
    provide: {
      t: i18n.global.t,
      i18n: i18n.global
    }
  }
})
