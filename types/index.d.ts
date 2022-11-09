import { AxiosInstance } from "axios";
import { Dialog, Notify, Toast } from "vant";

declare module "nuxt/dist/app/nuxt" {
  export interface NuxtApp {
    $api: AxiosInstance;
    $toast: typeof Toast;
    $dialog: typeof Dialog;
    $notify: typeof Notify;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}
