import { ApiRoutes, IBaseResponse, IPaginatedData } from '~~/types/api'
import { ISlideItem } from '~~/types/hero-slide'
import { IStock } from '~~/types/stock'

export const useApiServices = () => {
  const { $api } = useNuxtApp()
  const { showApiError, t } = useUtility()

  // Response Interceptor
  $api.interceptors.response.use(
    (response) => {
      if (response.data.code !== 0) {
        showApiError(response.data.msg)
      }

      return response
    },
    (error) => {
      if (process.dev) {
        // eslint-disable-next-line no-console
        console.log(error)
      }

      showApiError(t('api.error.general'))
    }
  )

  const loginService = (username: string, password: string) => {
    return $api.post(ApiRoutes.LOGIN, { loginname: username, password })
  }

  const searchStockService = (keyword: string, page = 1) => {
    return $api.get<IBaseResponse<IStock[]>>(ApiRoutes.SEARCH_STOCK, {
      params: {
        keyword,
        page
      }
    })
  }

  const carouselsService = () => {
    return $api.get<IBaseResponse<IPaginatedData<ISlideItem[]>>>(
      ApiRoutes.CAROUSELS
    )
  }

  return {
    loginService,
    searchStockService,
    carouselsService
  }
}
