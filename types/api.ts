export enum ApiRoutes {
  LOGIN = '/auth/login/app',
  SEARCH_STOCK = '/stock',
  CAROUSELS = '/carousels',
  CHINA_INDEXES = '/api/stocks/getCnIndexes',
  NEWS = '/api/financenews',
  ARTICLE_DETAILS = '/api/financenews/read',
  CHECK_TOKEN = '/api/checkToken',
  WATCH_LIST = '/api/optionals/index',
  POSITIONS = '/api/orders',
  USER_NEW_SHARES = '/api/newshares/getMemberNewshareList',
  STOCK_DETAILS = '/stock',
  STOCK_KLINE_DATA = '/api/stocks/getStockKLine',
  USER_INFORMATION ='/auth/get-app',
  BUY_LIMIT = '/orders/app/buy',
  WITHDRAW_MONEY = '/withdrawals/app',
  WITHDRAW_LIST = '/withdrawals',
  DEPOSIT_LIST = '/deposit',
  HOT_MARKET= '/api/stocks/getHotIndustry',
  HOT_CONCEPT = '/api/stocks/getHotConcept',
  HOT_SPOT = '/api/stocks/getHotspot',
  QNQUOTATION = '/api/stocks/getCnQuotation',
  GAINLIST = '/api/stocks/getRiseRank',
  DROPLIST = '/api/stocks/getFallRank',
  AMPLITUDE_INDEX = '/api/stocks/getAmplitude',
  TURNOVER_INDEX='/api/stocks/getTurnover',
  SELL = '/api/orders/sell',
  CHANGE_PASSWORD = '/app',
  CHANGE_WITHDRAWAL_PASSWORD = '/api/members/resetWithdrawPassword',
  OPTIONALS_INDEX = '/api/optionals/index',
  ADD_OPTION = '/api/optionals/addOptional',
  DELETE_OPTION = '/api/optionals/deleteOptional',
  SEARCH_OPTIONAL_STOCK = '/api/stocks/serchOptionalStock',
  ADD_DEPOSIT = '/deposit/app',
  KYC = '/app',
  UPLOAD_IMAGE = '/app/upload'
}

export interface IBaseResponse<DataType> {
  [x: string]: any;
  code: number;
  data: DataType;
  msg: string;
  type: string;
  count: number;
}

// Generated by https://quicktype.io

export interface IPaginatedData<DataType> {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  data: DataType;
}

export interface IUserData {
  id: number;
  balance: string;
  invite_code: string;
  is_frozen: number;
  loginname: string;
  realname: string;
  phone: string;
  last_login: number;
  last_login_ip: string;
}

export interface ILoginResponse extends IBaseResponse<IUserData> {
  token: string
}

export interface UserInfo<DataType> {
  data: DataType;
}
