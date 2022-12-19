import { ApiRoutes, IBaseResponse, ILoginResponse, IPaginatedData } from '~~/types/api'
import { ISlideItem } from '~~/types/hero-slide'
import { HotIndustry, HotSpot, Amplitude } from '~~/types/market'
import { INewShare } from '~~/types/new-share'
import { IArticleDetails, INews } from '~~/types/news'
import { IPositionResponse } from '~~/types/position'
import { IStock, IStockKlineData, IBuyStockReqBody, IStockSearch, IStockDetailsResponse } from '~~/types/stock'
import { IUserInfo, IUserDeposit, IUserChangeWithdrawalPassword, IUserChangePasswordRequestBody, IUserWithdrawal } from '~~/types/user'

export const useApiServices = () => {
  const { $api } = useNuxtApp()
  const accessToken = useAccessToken()

  //   Request intercept
  $api.interceptors.request.use((config) => {
    config.headers = {
      authorization: `Bearer ${accessToken.value}` || 'undefined',
      ...config.headers
    }

    return config
  })

  const loginService = (username: string, password: string) => {
    return $api.post<ILoginResponse>(ApiRoutes.LOGIN, { username, password })
  }

  const registerService = (username: string, password: string, agentCode: string) => {
    return $api.post<ILoginResponse>(ApiRoutes.REGISTER, { username, password, agent_code: agentCode })
  }

  const userInfoService = () => {
    return $api.get<IUserInfo>(ApiRoutes.USER_INFORMATION)
  }

  const searchStockService = (searchKey?: string, page = 1, pageSize = 20) => {
    return $api.get<IStock[]>(ApiRoutes.SEARCH_STOCK, {
      params: {
        searchKey,
        page,
        pageSize
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

  const positionsService = (page = 1, ps = 20) => {
    return $api.get<IPositionResponse>(ApiRoutes.POSITIONS, { params: { page, ps } })
  }

  const userNewSharesService = (page = 1) => {
    return $api.get<IBaseResponse<IPaginatedData<INewShare[]>>>(ApiRoutes.USER_NEW_SHARES, { params: { page } })
  }

  const stockDetailsService = (stockCode: string) => {
    return $api.get<IStockDetailsResponse>(`${ApiRoutes.STOCK_DETAILS}/${stockCode}`)
  }

  const depositListService = () => {
    return $api.get<IUserDeposit[]>(ApiRoutes.DEPOSIT_LIST)
  }

  const depositDetailService2 = (id: number) => {
    return $api.get<IUserDeposit>(`${ApiRoutes.DEPOSIT_LIST}/${id}`)
  }

  const stockKlineDataService = (stockCode: string, period: string, fromTick = 1) => {
    return $api.get<IStockKlineData[]>(ApiRoutes.STOCK_KLINE_DATA.replace(':id', stockCode), { params: { period, fromTick } })
  }

  const buyingStockLimitService = (payload : IBuyStockReqBody) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.BUY_LIMIT, payload)
  }

  const sellStockLimitService = (positionId: number) => {
    return $api.post<IBaseResponse<undefined>>(`${ApiRoutes.SELL}/${positionId}`)
  }

  const withdrawMoneyService = (amount: number, withdrawPassword: string) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.WITHDRAW_MONEY, { amount, withdraw_password: withdrawPassword })
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
  const changePasswordService = (param: IUserChangePasswordRequestBody) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.CHANGE_PASSWORD, param)
  }

  const changeWithdrawalPasswordService = (param: IUserChangeWithdrawalPassword) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.CHANGE_WITHDRAWAL_PASSWORD, param)
  }
  // ------WISHLIST PAGE------
  const wishlistService = (page = 1) => {
    return $api.get<IBaseResponse<IStockSearch[]>>(ApiRoutes.OPTIONALS_INDEX, {
      params: {
        page
      }
    })
  }

  const addOneToWishListService = (stock: IStock) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.ADD_OPTION, stock)
  }

  const deleteOneFromWishListService = (stockCode: string) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.DELETE_OPTION, { fullcode: stockCode })
  }

  const addNewDeposit = (amount: number, id: number) => {
    return $api.post(ApiRoutes.ADD_DEPOSIT, {
      amount,
      deposit_account_id: id
    })
  }

  const kycService = (param: object) => {
    return $api.patch<IUserInfo>(ApiRoutes.KYC, param)
  }

  const uploadImageService = (formData: FormData, type: 0 | 1) => {
    return $api.post(`${ApiRoutes.UPLOAD_IMAGE}?type=${type}`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  }

  const withdrawalHistoryService = () => {
    return $api.get<IUserWithdrawal[]>(ApiRoutes.WITHDRAW_LIST)
  }

  const sellablePositionsService = (stockCode: string) => {
    return $api.get<IPositionResponse>(ApiRoutes.SELLABLE_POSITION, { params: { stock_code: stockCode } })
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
    depositListService,
    hotIndustryService,
    hotConceptService,
    hotSpotService,
    qNQuotationService,
    gainListService,
    dropListService,
    amplitudeListService,
    turnoverListService,
    sellStockLimitService,
    changePasswordService,
    changeWithdrawalPasswordService,
    wishlistService,
    addOneToWishListService,
    deleteOneFromWishListService,
    addNewDeposit,
    depositDetailService2,
    kycService,
    uploadImageService,
    withdrawalHistoryService,
    registerService,
    sellablePositionsService
  }
}
