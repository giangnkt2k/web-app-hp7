import { IStock } from './stock'

export enum COMMON_STATUS {
    CLOSED = 'closed',
    PENDING = 'pending',
    OPENING = 'opening',
  }

export enum TRX_TYPE {
    NOR = 'normal',
    LAR = 'large',
  }

export interface IBlockDeal {
    id: number;
    stock_code: number;
    stock_name: string;
    quantity: number;
    trx_key: string;
    discount: number;
    start_time: number;
    end_time: number;
    status: COMMON_STATUS;
    is_active: boolean;
    is_delete: boolean;
    increase_ratio: number;
    stock_detail: IStock;
}
