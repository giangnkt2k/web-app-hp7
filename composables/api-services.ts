import { ApiRoutes, IBaseResponse, ILoginResponse, IPaginatedData } from '~~/types/api'
import { ISlideItem } from '~~/types/hero-slide'
import { INewShare } from '~~/types/new-share'
import { IArticleDetails, INews } from '~~/types/news'
import { IPositionResponse } from '~~/types/position'
import { IStock, IStockDetailsResponse, IStockKlineData, IBuyStockReqBody } from '~~/types/stock'
import { IUserInfo, IUserDeposit } from '~~/types/user'

export const useApiServices = () => {
  const { $api } = useNuxtApp()
  const accessToken = useAccessToken()

  //   Request intercept
  $api.interceptors.request.use((config) => {
    config.headers = {
      authorization: accessToken.value || 'undefined',
      ...config.headers
    }

    return config
  })

  const loginService = (username: string, password: string) => {
    return $api.post<ILoginResponse>(ApiRoutes.LOGIN, { loginname: username, password })
  }

  const userInfoService = () => {
    return $api.post<IBaseResponse<IUserInfo>>(ApiRoutes.USER_INFORMATION)
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

  const depositDetailService = (page = 1) => {
    return $api.get <IBaseResponse<IPaginatedData<IUserDeposit>>>(ApiRoutes.DEPOSIT_LIST, { params: { page } })
  }

  const stockKlineDataService = (stockCode: string, period: string) => {
    return $api.get<IBaseResponse<IStockKlineData[]>>(ApiRoutes.STOCK_KLINE_DATA, { params: { code: stockCode, period } })
  }

  const buyingStockLimit = (param : IBuyStockReqBody) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.BUY_LIMIT, { param })
  }

  const withdrawMoneyService = (amount: number, withdrawPassword: string) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.WITHDRAW_MONEY, { params: { amount, withdraw_password: withdrawPassword } })
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
    buyingStockLimit,
    userInfoService,
    withdrawMoneyService,
    depositDetailService
  }
}
