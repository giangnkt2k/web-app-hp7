import { defineStore } from 'pinia'

const useAppStore = defineStore('app-store', () => {
  const isAppInited = ref(false)
  return {
    isAppInited
  }
})
export default useAppStore
