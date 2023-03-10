import { UserHolding } from './position'

export interface IStock {
  id: number;
  N: string;
  M: string;
  S: string;
  C: string;
  FS: string;
  P: number;
  NV: number;
  Tick: number;
  B1: number;
  B2: number;
  B3: number;
  B4: number;
  B5: number;
  B1V: number;
  B2V: number;
  B3V: number;
  B4V: number;
  B5V: number;
  S1: number;
  S2: number;
  S3: number;
  S4: number;
  S5: number;
  S1V: number;
  S2V: number;
  S3V: number;
  S4V: number;
  S5V: number;
  ZT: number;
  DT: number;
  O: number;
  H: number;
  L: number;
  YC: number;
  A: number;
  V: number;
  OV: number;
  IV: number;
  SY: number;
  SJ: number;
  HS: number;
  ZS: number;
  LS: number;
  Z: number;
  Z2: number;
  VF: number;
  ZF: number;
  JS: number;
  YJS: number;
  HD: number;
  YHD: number;
  AVP: number;
  SY2: number;
  QJ: number;
  QR: string;
  MT: number;
  created_at?: string;
  update_at?: string;
  user_id?: number | null;
}

export interface IStockSearch extends IStock {
  is_optional: number;
}

export interface IStockDetailsResponse {
  stock_data: IStock;
  user_holding: UserHolding
}

export interface IStockKlineData {
  C: number;
  Tick: number;
  O: number;
  H: number;
  L: number;
  A: number;
  V: number;
  D: string;
}

export interface IBuyStockReqBody {
  stock_code: string;
  quantity: number;
}
