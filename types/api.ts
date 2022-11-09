export enum ApiRoutes {
  LOGIN = "/login",
  SEARCH_STOCK = "/stocks/searchStocks",
}

export interface IBaseResponse<DataType> {
  code: number;
  data: DataType;
  msg: string;
  type: string;
}
