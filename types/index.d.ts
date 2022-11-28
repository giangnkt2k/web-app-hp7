import { AxiosInstance } from 'axios'
import dayjs from 'dayjs'
import { Dialog, Notify, Toast } from 'vant'
import { i18n } from '~~/plugins/i18n'

declare module 'nuxt/dist/app/nuxt' {
  export interface NuxtApp {
    $api: AxiosInstance;
    $toast: typeof Toast;
    $dialog: typeof Dialog;
    $notify: typeof Notify;
    $dayjs: typeof dayjs;
    $t: typeof i18n.global.t
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
    $toast: typeof Toast;
    $dialog: typeof Dialog;
    $notify: typeof Notify;
    $dayjs: typeof dayjs
  }
}

declare module '#app' {
  interface PageMeta {
    pageTitle?: string
  }
}

export {}
