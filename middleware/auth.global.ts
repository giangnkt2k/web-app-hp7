export default defineNuxtRouteMiddleware(async (to) => {
  const { $routesList } = useNuxtApp()
  const { userInfoService } = useApiServices()

  const accessToken = useAccessToken()
  const isAuthorized = useIsAuthorized()

  if (to.name === $routesList.login && accessToken.value) {
    return navigateTo({ name: $routesList.index })
  }
  if (to.name !== $routesList.login && accessToken.value && !isAuthorized.value) {
    try {
      const response = await userInfoService()

      const isTokenValid = response?.status === 200
      isAuthorized.value = true

      if (!isTokenValid) {
        accessToken.value = ''
        return navigateTo({ name: $routesList.login })
      }
    } catch (error) {
      return navigateTo({ name: $routesList.login })
    }
  }
  isAuthorized.value = true

  if (to.name !== $routesList.login && !accessToken.value) {
    return navigateTo({ name: $routesList.login })
  }
})
