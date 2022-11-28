import { storeToRefs } from 'pinia'
import useAppStore from '~~/stores'
import { useAuthenticationStore } from '~~/stores/authentication'

export default defineNuxtRouteMiddleware(async () => {
  const appStore = useAppStore()
  const authStore = useAuthenticationStore()
  const isAuthorized = useIsAuthorized()

  const { getUserData } = authStore
  const { isAppInited } = storeToRefs(appStore)

  if (!isAppInited.value || !isAuthorized.value) {
    await getUserData()
  }

  isAppInited.value = true
})
