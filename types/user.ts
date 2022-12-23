import { DEPOSIT_STATUS } from './deposit'
import { IDepositAccount } from './deposit-account'
import { ILocalFile } from './local-files'
import { IPosition } from './position'

export enum APP_USER_VERIFY_STATUS {
  PENDING,
  NOT_VERIFIED,
  VERIFIED,
}

export interface IUserInfo {
  created_at: string;
  updated_at: string;
  id: number;
  username: string;
  real_name: string;
  id_front: ILocalFile;
  id_back: ILocalFile;
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
  is_verified: APP_USER_VERIFY_STATUS;
  positions: IPosition[] | null;
  has_withdraw_password: boolean
}

export interface IUserDeposit {
  created_at: string;
  updated_at: string;
  id: number;
  amount: number;
  status: DEPOSIT_STATUS;
  comments: null;
  remarks: null;
  approved_by: null;
  deposit_account: IDepositAccount;
  app_user: Pick<IUserInfo, 'username' | 'real_name'>;
}

export interface IUserChangePasswordRequestBody {
  old_password: string;
  new_password: string;
}

export interface IUserChangeWithdrawalPassword {
  old_password: string;
  new_password: string;
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

export type KycSubmitDto = {
  real_name: string;
  phone: string;
  id_number: string;
  id_front: string;
  id_back: string;
  bank_name: string;
  bank_number: string;
  account_holder: string;
  bank_branch: string
};
