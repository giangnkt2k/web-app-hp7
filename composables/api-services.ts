import { ApiRoutes, IBaseResponse, ILoginResponse, IPaginatedData } from '~~/types/api'
import { ISlideItem } from '~~/types/hero-slide'
import { INewShare } from '~~/types/new-share'
import { IArticleDetails, INews } from '~~/types/news'
import { IPositionResponse } from '~~/types/position'
import { IStock, IStockDetailsResponse, IStockKlineData } from '~~/types/stock'
import { IBuyLimit } from '~~/types/buy-limit'

export const useApiServices = () => {
  const { $api } = useNuxtApp()
  const { showApiError, t } = useUtility()
  const accessToken = useAccessToken()

  //   Request intercept
  $api.interceptors.request.use((config) => {
    config.headers = {
      // Authorization: `Bearer ${accessToken.value || 'undefined'}`,
      authorization: accessToken.value || 'undefined',
      ...config.headers
    }

    return config
  })

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
      return null
    }
  )

  const loginService = (username: string, password: string) => {
    return $api.post<ILoginResponse>(ApiRoutes.LOGIN, { loginname: username, password })
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

  const chinaIndexesService = () => {
    return $api.get<IBaseResponse<IStock[]>>(
      ApiRoutes.CHINA_INDEXES
    )
  }

  const newsService = (page = 1) => {
    return $api.get<IBaseResponse<{ data: INews[] }>>(
      ApiRoutes.NEWS,
      {
        params: {
          page
        }
      }
    )
  }

  const articleDetailsService = (id: string) => {
    return $api.get<IBaseResponse<IArticleDetails>>(ApiRoutes.ARTICLE_DETAILS, {
      params: {
        id
      }
    })
  }

  const checkTokenService = () => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.CHECK_TOKEN, {})
  }

  const watchListService = (page = 1) => {
    return $api.get<IBaseResponse<IStock[]>>(ApiRoutes.WATCH_LIST, { params: { page } })
  }

  const positionsService = (page = 1) => {
    return $api.get<IPositionResponse>(ApiRoutes.POSITIONS, { params: { page } })
  }

  const userNewSharesService = (page = 1) => {
    return $api.get<IBaseResponse<IPaginatedData<INewShare[]>>>(ApiRoutes.USER_NEW_SHARES, { params: { page } })
  }

  const stockDetailsService = (stockCode: string) => {
    return $api.get<IStockDetailsResponse>(ApiRoutes.STOCK_DETAILS, { params: { keyword: stockCode } })
  }

  const stockKlineDataService = (stockCode: string, period: string) => {
    return $api.get<IBaseResponse<IStockKlineData[]>>(ApiRoutes.STOCK_KLINE_DATA, { params: { code: stockCode, period } })
  }

  const buyingStockLimnit = (param : object) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.BUY_LIMIT, { param })
  }

  return {
    loginService,
    searchStockService,
    carouselsService,
    chinaIndexesService,
    newsService,
    articleDetailsService,
    checkTokenService,
    watchListService,
    positionsService,
    userNewSharesService,
    stockDetailsService,
    stockKlineDataService,
    buyingStockLimnit
  }
}
