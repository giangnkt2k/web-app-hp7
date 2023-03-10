import { ApiRoutes, IBaseResponse, ILoginResponse, IPaginatedData } from '~~/types/api'
import { IDepositAccount } from '~~/types/deposit-account'
import { ISlideItem } from '~~/types/hero-slide'
import { HotIndustry, HotSpot, Amplitude } from '~~/types/market'
import { INewShare } from '~~/types/new-share'
import { IArticleDetails, INews } from '~~/types/news'
import { IPositionResponse } from '~~/types/position'
import { IStock, IStockKlineData, IBuyStockReqBody, IStockDetailsResponse } from '~~/types/stock'
import { IUserInfo, IUserDeposit, IUserChangeWithdrawalPassword, IUserChangePasswordRequestBody, IUserWithdrawal, KycSubmitDto } from '~~/types/user'
// import { WatchListItem } from '~~/types/watch-list'

export const useApiServices = () => {
  const { $api } = useNuxtApp()

  const loginService = (username: string, password: string) => {
    return $api.post<ILoginResponse>(ApiRoutes.LOGIN, { username, password })
  }

  const registerService = (username: string, password: string, agentCode: string) => {
    return $api.post<ILoginResponse>(ApiRoutes.REGISTER, { username, password, agent_code: agentCode })
  }

  const userInfoService = () => {
    return $api.get<IUserInfo>(ApiRoutes.USER_INFORMATION)
  }

  const getUserFrozenBalanceService = () => {
    return $api.get<{amount: number}>(ApiRoutes.GET_USER_FROZEN_BALANCE)
  }

  const searchStockService = (searchKey?: string, page = 1, pageSize = 20) => {
    return $api.get<IPaginatedData<IStock[]>>(ApiRoutes.SEARCH_STOCK, {
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
    return $api.get<IPaginatedData<IStock[]>>(ApiRoutes.WATCH_LIST, { params: { page } })
  }

  const positionsService = (page = 1, pageSize = 20) => {
    return $api.get<IPositionResponse>(ApiRoutes.POSITIONS, { params: { page, pageSize } })
  }

  const userNewSharesService = (page = 1) => {
    return $api.get<IBaseResponse<IPaginatedData<INewShare[]>>>(ApiRoutes.USER_NEW_SHARES, { params: { page } })
  }

  const stockDetailsService = (stockCode: string) => {
    return $api.get<IStockDetailsResponse>(`${ApiRoutes.STOCK_DETAILS}/${stockCode}`)
  }

  const depositListService = (page: number, pageSize: number) => {
    return $api.get<IPaginatedData<IUserDeposit[]>>(ApiRoutes.DEPOSIT_LIST, {
      params: {
        page,
        pageSize
      }
    })
  }

  const depositDetailService = (id: number) => {
    return $api.get<IUserDeposit>(`${ApiRoutes.DEPOSIT_DETAILS}/${id}`)
  }

  const stockKlineDataService = (stockCode: string, period: string, fromTick = 1) => {
    return $api.get<IStockKlineData[]>(ApiRoutes.STOCK_KLINE_DATA, { params: { period, fromtick: fromTick, symbol: stockCode, psize: 500 } })
  }

  const buyingStockLimitService = (payload : IBuyStockReqBody) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.BUY_LIMIT, payload)
  }

  const sellStockLimitService = (positionId: number) => {
    return $api.post<IBaseResponse<undefined>>(ApiRoutes.SELL.replace(':id', positionId.toString()))
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
  const changePasswordService = (payload: IUserChangePasswordRequestBody) => {
    return $api.patch(ApiRoutes.CHANGE_PASSWORD, payload)
  }

  const changeWithdrawalPasswordService = (payload: IUserChangeWithdrawalPassword) => {
    return $api.patch(ApiRoutes.CHANGE_WITHDRAWAL_PASSWORD, payload)
  }

  // eslint-disable-next-line camelcase
  const setWithdrawalPasswordService = (withdraw_password: string) => {
  // eslint-disable-next-line camelcase
    return $api.patch(ApiRoutes.SET_WITHDRAW_PASSWORD, { withdraw_password })
  }
  // ------WISHLIST PAGE------
  const wishlistService = (page: number, pageSize: number) => {
    return $api.get<IPaginatedData<IStock[]>>(ApiRoutes.OPTIONALS_INDEX, {
      params: {
        page,
        pageSize
      }
    })
  }

  const addOneToWishListService = (stock: IStock) => {
    return $api.patch<IBaseResponse<undefined>>(`${ApiRoutes.ADD_OPTION}/${stock.FS}`)
  }

  const deleteOneFromWishListService = (stock: IStock) => {
    return $api.patch<IBaseResponse<undefined>>(`${ApiRoutes.DELETE_OPTION}/${stock.FS}`)
  }

  const addNewDepositService = (amount: number, id: number) => {
    return $api.post<IUserDeposit>(ApiRoutes.ADD_DEPOSIT, {
      amount,
      deposit_account_id: id
    })
  }

  const kycService = (payload: KycSubmitDto) => {
    return $api.patch<IUserInfo>(ApiRoutes.KYC, payload)
  }

  const uploadFrontIdService = (formData: FormData) => {
    return $api.post(`${ApiRoutes.UPLOAD_FRONT_DOC}?type=1`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  }

  const uploadBackIdService = (formData: FormData) => {
    return $api.post(`${ApiRoutes.UPLOAD_BACK_DOC}?type=0`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  }

  const withdrawalHistoryService = () => {
    return $api.get<IPaginatedData<IUserWithdrawal[]>>(ApiRoutes.WITHDRAW_LIST)
  }

  // eslint-disable-next-line camelcase
  const sellablePositionsService = (stock_code: string) => {
  // eslint-disable-next-line camelcase
    return $api.get<IPositionResponse>(ApiRoutes.SELLABLE_POSITION, { params: { stock_code } })
  }

  const getDepositAccountsService = () => {
    return $api.get<IPaginatedData<IDepositAccount[]>>(ApiRoutes.GET_DEPOSIT_ACCOUNTS)
  }

  const isHasWithdrawalPasswordService = () => {
    return $api.get(ApiRoutes.IS_HAS_WITHDRAWAL_PASSWORD)
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
    addNewDepositService,
    depositDetailService,
    kycService,
    uploadFrontIdService,
    uploadBackIdService,
    withdrawalHistoryService,
    registerService,
    sellablePositionsService,
    setWithdrawalPasswordService,
    getDepositAccountsService,
    getUserFrozenBalanceService,
    isHasWithdrawalPasswordService
  }
}
