import { IPosition } from './position'

export interface IUserInfo {
  created_at: string;
  updated_at: string;
  id: number;
  username: string;
  real_name: string;
  id_front: null;
  id_back: null;
  id_number: string;
  phone: string;
  bank_name: string;
  bank_number: string;
  bank_branch: string;
  account_holder: string;
  balance_avail: number;
  balance_avail_newshare: number;
  can_ipo: boolean;
  is_playing_board: boolean;
  is_active: boolean;
  is_freeze: boolean;
  verification_status: number;
  positions: IPosition[] | null;
  has_withdraw_password: boolean
}

export enum APP_USER_VERIFY_STATUS {
  PENDING,
  NOT_VERIFIED,
  VERIFIED,
}

export interface IUserDeposit {
  created_at: string;
  id: number;
  user_id: number;
  amount: number;
  deposit_account_id: number;
  is_reviewed: boolean;
  is_virtual_deposit: boolean;
  comments: string;
  remark: string;
  __entity: string;
}

export interface IUserChangePasswordRequestBody {
    password: string;
    newPassword: string;
}

export interface IUserChangeWithdrawalPassword {
    password: string;
    newPassword: string;
}

export interface IUserWithdrawal
{
    created_at: string;
    updated_at: string;
    id: number;
    username: string;
    amount: number;
    before: number;
    after: number;
    is_approved: boolean;
    comments: string;
    remark: string;
    reviewed_by: string;
    reviewed_at: string;
    __entity: string;
}
