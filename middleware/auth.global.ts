import { useAuthenticationStore } from '~~/stores/authentication'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $routesList } = useNuxtApp()
  const { userInfoService } = useApiServices()

  const authStore = useAuthenticationStore()
  const { setUserData } = authStore

  const accessToken = useAccessToken()
  const isAuthorized = useIsAuthorized()
  if (to.name !== $routesList.login && accessToken.value && !isAuthorized.value) {
    try {
      const response = await userInfoService()

      const isTokenValid = !!response?.data
      isAuthorized.value = true

      if (!isTokenValid) {
        accessToken.value = ''
        return navigateTo({ name: $routesList.login })
      }

      setUserData(response?.data)
    } catch (error) {
      return navigateTo({ name: $routesList.login })
    }
  }

  if (to.name !== $routesList.login && !accessToken.value) {
    return navigateTo({ name: $routesList.login })
  }
})
