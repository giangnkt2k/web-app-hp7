import { IStock } from './stock'
import { IUserInfo } from './user'

export enum POSITION_STATUS {
  CLOSED,
  OPEN,
}

export interface IPosition {
  created_at: string;
  updated_at: string;
  id: number;
  stock: IStock;
  app_user: IUserInfo;
  quantity: number;
  price: number;
  status: POSITION_STATUS;
}

export interface IPositionResponse {
  data: IPosition[],
  count: number
}

export type UserHolding = {
  total_count: number;
  today_count: number
}
