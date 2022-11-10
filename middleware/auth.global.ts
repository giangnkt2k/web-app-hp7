import { ApiRoutes, IBaseResponse } from '~~/types/api'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $routesList, $api } = useNuxtApp()

  const accessToken = useAccessToken()
  const isAuthorized = useIsAuthorized()

  // Check if the token is valid
  const checkTokenService = (token: string) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.CHECK_TOKEN, {}, { headers: { authorization: token } })
  }

  if (to.name === $routesList.login && accessToken.value) {
    return navigateTo({ name: $routesList.index })
  }

  if (to.name !== $routesList.login && accessToken.value && !isAuthorized.value) {
    const response = await checkTokenService(accessToken.value)
    const isTokenValid = response.data.code === 0
    isAuthorized.value = true

    if (!isTokenValid) {
      accessToken.value = ''
      return navigateTo({ name: $routesList.login })
    }
  }

  if (to.name !== $routesList.login && !accessToken.value) {
    return navigateTo({ name: $routesList.login })
  }
})
