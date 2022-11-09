export enum ApiRoutes {
  LOGIN = "/api/login",
  SEARCH_STOCK = "/api/stocks/searchStocks",
}

export interface IBaseResponse<DataType> {
  code: number;
  data: DataType;
  msg: string;
  type: string;
}
