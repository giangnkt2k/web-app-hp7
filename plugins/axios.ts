import axios from 'axios'
import { useAuthenticationStore } from '~~/stores/authentication'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const accessToken = useAccessToken()

  const api = axios.create({
    baseURL: config.public.API_ENDPOINT
  })

  const { logout } = useAuthenticationStore()

  //   Request intercept
  api.interceptors.request.use((config) => {
    if (process.client) {
      accessToken.value = useAccessToken().value
    }
    config.headers = {
      authorization: `Bearer ${accessToken.value}` || 'undefined',
      ...config.headers
    }

    return config
  })

  //   Response intercept
  api.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        logout()
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
