import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const api = axios.create({
    baseURL: config.public.API_ENDPOINT
  })

  return {
    provide: {
      api
    }
  }
})
