import { ApiRoutes, IBaseResponse, ILoginResponse, IPaginatedData } from '~~/types/api'
import { ISlideItem } from '~~/types/hero-slide'
import { HotIndustry, HotSpot, Amplitude } from '~~/types/market'
import { INewShare } from '~~/types/new-share'
import { IArticleDetails, INews } from '~~/types/news'
import { IPositionResponse } from '~~/types/position'
import { IStock, IStockDetailsResponse, IStockKlineData, IBuyStockReqBody } from '~~/types/stock'
import { IUserInfo, IUserDeposit, IUserChangeWithdrawalPassword, IUserChangePassword } from '~~/types/user'

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
    return $api.get <IBaseResponse<IPaginatedData<IUserDeposit[]>>>(ApiRoutes.DEPOSIT_LIST, { params: { page } })
  }

  const stockKlineDataService = (stockCode: string, period: string) => {
    return $api.get<IBaseResponse<IStockKlineData[]>>(ApiRoutes.STOCK_KLINE_DATA, { params: { code: stockCode, period } })
  }

  const buyingStockLimitService = (param : IBuyStockReqBody) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.BUY_LIMIT, param)
  }

  const sellStockLimitService = (param : IBuyStockReqBody) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.SELL, param)
  }

  const withdrawMoneyService = (amount: number, withdrawPassword: string) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.WITHDRAW_MONEY, { params: { amount, withdraw_password: withdrawPassword } })
  }

  // ------MARKET PAGE------
  const hotIndustryService = () => {
    return $api.get<IBaseResponse<HotIndustry[]>>(ApiRoutes.HOT_MARKET)
  }

  const hotConceptService = () => {
    return $api.get<IBaseResponse<HotIndustry[]>>(ApiRoutes.HOT_CONCEPT)
  }

  const hotSpotService = () => {
    return $api.get<IBaseResponse<HotSpot[]>>(ApiRoutes.HOT_SPOT)
  }

  const qNQuotationService = (page = 1) => {
    return $api.get<IBaseResponse<IStock[]>>(ApiRoutes.QNQUOTATION, {
      params: {
        page
      }
    })
  }

  const gainListService = (page = 1) => {
    return $api.get<IBaseResponse<IStock[]>>(ApiRoutes.GAINLIST, {
      params: {
        page
      }
    })
  }

  const dropListService = (page = 1) => {
    return $api.get<IBaseResponse<IStock[]>>(ApiRoutes.DROPLIST, {
      params: {
        page
      }
    })
  }

  const amplitudeListService = (page = 1) => {
    return $api.get<IBaseResponse<Amplitude[]>>(ApiRoutes.AMPLITUDE_INDEX, {
      params: {
        page
      }
    })
  }

  const turnoverListService = (page = 1) => {
    return $api.get<IBaseResponse<Amplitude[]>>(ApiRoutes.TURNOVER_INDEX, {
      params: {
        page
      }
    })
  }

  // ------Profile------
  const changePassword = (param: IUserChangePassword) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.CHANGE_PASSWORD, param)
  }

  const changeWithdrawalPassword = (param: IUserChangeWithdrawalPassword) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.CHANGE_WITHDRAWAL_PASSWORD, param)
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
    buyingStockLimitService,
    userInfoService,
    withdrawMoneyService,
    depositDetailService,
    hotIndustryService,
    hotConceptService,
    hotSpotService,
    qNQuotationService,
    gainListService,
    dropListService,
    amplitudeListService,
    turnoverListService,
    sellStockLimitService,
    changePassword,
    changeWithdrawalPassword
  }
}
