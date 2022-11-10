import { AxiosInstance } from 'axios'
import dayjs from 'dayjs'
import { Dialog, Notify, Toast } from 'vant'

declare module 'nuxt/dist/app/nuxt' {
  export interface NuxtApp {
    $api: AxiosInstance;
    $toast: typeof Toast;
    $dialog: typeof Dialog;
    $notify: typeof Notify;
    $dayjs: typeof dayjs
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}

declare module '#app' {
  interface PageMeta {
    pageTitle?: string
  }
}

export {}
