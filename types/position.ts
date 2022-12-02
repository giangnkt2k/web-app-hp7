import { IStock } from './stock'

export interface IPosition {
  created_at: string;
  updated_at: string;
  id: number;
  user_id: string;
  stock_code: string;
  quantity: string;
  price: number;
  amount: number;
  status: number;
}

export interface IPositionResponse {
  positions: IPosition[],
  stocks: IStock[]
}

export type UserHolding = {
  total_count: number;
  today_count: number
}
