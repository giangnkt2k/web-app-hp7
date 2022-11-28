import { ApiRoutes, IBaseResponse, ILoginResponse, IPaginatedData } from '~~/types/api'
import { ISlideItem } from '~~/types/hero-slide'
import { HotIndustry, HotSpot, Amplitude } from '~~/types/market'
import { INewShare } from '~~/types/new-share'
import { IArticleDetails, INews } from '~~/types/news'
import { IPositionResponse } from '~~/types/position'
import { IStock, IStockKlineData, IBuyStockReqBody, IStockSearch } from '~~/types/stock'
import { IUserInfo, IUserDeposit } from '~~/types/user'

export const useApiServices = () => {
  const { $api, $typedRouter, $routesList } = useNuxtApp()
  const accessToken = useAccessToken()

  //   Request intercept
  $api.interceptors.request.clear()
  $api.interceptors.request.use((config) => {
    config.headers = {
      authorization: `Bearer ${accessToken.value}`,
      ...config.headers
    }

    return config
  })

  //   Response intercept
  $api.interceptors.response.clear()
  $api.interceptors.response.use((response) => {
    if (response.status === 401) {
      $typedRouter.push({ name: $routesList.login })
    }

    return response
  })

  const loginService = (username: string, password: string) => {
    return $api.post<ILoginResponse>(ApiRoutes.LOGIN, { loginname: username, password })
  }

  const userInfoService = async () => {
    try {
      return await $api.get<IBaseResponse<IUserInfo>>(ApiRoutes.USER_INFORMATION)
    } catch (error) {
      if (process.dev) {
        // eslint-disable-next-line no-console
        console.log('ERROR: ', { error })
      }
    }
  }

  const searchStockService = (keyword: string, page = 1, ps = 20) => {
    return $api.get<IBaseResponse<IStock[]>>(ApiRoutes.SEARCH_STOCK, {
      params: {
        where: keyword,
        page,
        ps
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
    return $api.get<IStock>(`${ApiRoutes.STOCK_DETAILS}/${stockCode}`)
  }

  const depositListService = () => {
    return $api.get<IUserDeposit[]>(ApiRoutes.DEPOSIT_LIST)
  }

  const depositDetailService2 = (id: number) => {
    return $api.get<IUserDeposit>(`${ApiRoutes.DEPOSIT_LIST}/${id}`)
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

  // ------WISHLIST PAGE------
  const wishlistService = (page = 1) => {
    return $api.get<IBaseResponse<IStockSearch[]>>(ApiRoutes.OPTIONALS_INDEX, {
      params: {
        page
      }
    })
  }

  const addOneToWishListService = (stock: IStockSearch) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.ADD_OPTION, stock)
  }

  const deleteOneFromWishListService = (stockCode: string) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.DELETE_OPTION, { fullcode: stockCode })
  }

  const searchOptionalStockService = (keyword: string, page = 1) => {
    return $api.get<IBaseResponse<IStockSearch[]>>(ApiRoutes.SEARCH_OPTIONAL_STOCK, {
      params: {
        keyword,
        page
      }
    })
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
    wishlistService,
    addOneToWishListService,
    deleteOneFromWishListService,
    searchOptionalStockService,
    addNewDeposit,
    depositDetailService2,
    kycService,
    uploadImageService
  }
}
