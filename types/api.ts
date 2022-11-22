export enum ApiRoutes {
  LOGIN = '/api/login',
  SEARCH_STOCK = '/api/stocks/searchStocks',
  CAROUSELS = '/carousels',
  CHINA_INDEXES = '/api/stocks/getCnIndexes',
  NEWS = '/api/financenews',
  ARTICLE_DETAILS = '/api/financenews/read',
  CHECK_TOKEN = '/api/checkToken',
  WATCH_LIST = '/api/optionals/index',
  POSITIONS = '/api/orders',
  USER_NEW_SHARES = '/api/newshares/getMemberNewshareList',
  STOCK_DETAILS = '/api/stocks/getStockInfo',
  STOCK_KLINE_DATA = '/api/stocks/getStockKLine',
  USER_INFORMATION ='/api/getUserInfo',
  BUY_LIMIT = '/api/orders/buyDailyLimit',
  WITHDRAW_MONEY = '/api/withdraws/save',
  DEPOSIT_LIST = '/api/deposits',
  SELL = '/api/orders/sell'
}

export interface IBaseResponse<DataType> {
  code: number;
  data: DataType;
  msg: string;
  type: string;
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
