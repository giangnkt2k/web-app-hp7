import { Toast, Dialog, Notify } from 'vant'
import '@vant/touch-emulator'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: Toast,
      dialog: Dialog,
      notify: Notify
    }
  }
})
