import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const accessToken = useCookie('access-token')
  const api = axios.create({
    baseURL: config.public.API_ENDPOINT
  })

  //   Request intercept
  api.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      authorization: accessToken.value
    }

    return config
  })

  return {
    provide: {
      api
    }
  }
})
