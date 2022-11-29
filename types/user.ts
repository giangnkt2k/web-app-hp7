export interface IUserInfo
{
    id: number;
    balance: number;
    is_real: number;
    withdraw_password: number;
    loginname: string;
    id_number: string;
    id_front: string;
    id_back: string;
    phone: string;
    bankname: string;
    banknumber: string;
    bankbranch: string;
    accountname: string;
    withdraw_tips: string;
    balance_frozen: number;
    balance_avail: string;
    balance_avail_newshare: string;
    total_assets: string;
    sell_amount_today: number;
    withdraw_avail: string;
    hold_value: number;
    profit: string;
    online_service: string
    created_at: string;
    username: string ;
    is_verified: string ;
    real_name: string ;
    id_number_cccd: string ;
    id_front_cccd: number ;
    id_back_cccd: number ;
    bank_name: string ;
    bank_number: string ;
    bank_branch: string ;
    account_name: string ;
    sell_amount_day: string ;
    is_freeze: string ;
    agent_code: string ;
    superior: string ;
    last_login_ip: string ;
    ipo_application: string ;
    id_playing_board: boolean ;
    created_by: string ;
    is_active: string ;
    __entity: string ;
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
    oldpassword: string;
    password: string;
}

export interface IUserChangeWithdrawalPassword {
    withdraw_password: string;
    rewithdraw_password: string;
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
