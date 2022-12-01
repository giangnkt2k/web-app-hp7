import { IBaseResponse, IPaginatedData } from './api'
import { IStock } from './stock'

export interface IPosition {
  id: number;
  mid: number;
  agent_id: number;
  parent_id: number;
  market: string;
  p_name: string;
  p_code: string;
  status: number;
  price: string;
  count: string;
  is_dailylimit: number;
  count_dailylimit_sub: string;
  status_dailylimit: number;
  fee: string;
  created_at: number;
  count_today: string | null;
  count_today_dailylimit: string | null;
}

export type IPositionRestocks = Record<string, IStock>

export interface IPositionResponse extends IBaseResponse<IPaginatedData<IPosition[]>> {
  reStocks: IPositionRestocks
}

export type UserHolding = {
  total_count: number;
  today_count: number
}
