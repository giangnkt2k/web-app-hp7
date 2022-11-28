import { ApiRoutes, IBaseResponse } from '~~/types/api'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $routesList, $api } = useNuxtApp()

  const accessToken = useAccessToken()
  const isAuthorized = useIsAuthorized()
  // Check if the token is valid
  const checkTokenService = (token: string) => {
    return $api.get<IBaseResponse<undefined>>(ApiRoutes.USER_INFORMATION, { headers: { authorization: `Bearer ${token}` } })
  }

  if (to.name === $routesList.login && accessToken.value) {
    return navigateTo({ name: $routesList.index })
  }
  if (to.name !== $routesList.login && accessToken.value && !isAuthorized.value) {
    const response = await checkTokenService(accessToken.value)
    const isTokenValid = response.status === 200
    isAuthorized.value = true

    if (!isTokenValid) {
      accessToken.value = ''
      return navigateTo({ name: $routesList.login })
    }
  }
  isAuthorized.value = true

  if (to.name !== $routesList.login && !accessToken.value) {
    return navigateTo({ name: $routesList.login })
  }
})
