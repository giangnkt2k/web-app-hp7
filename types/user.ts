export interface IUserInfo
{
    id: number,
    balance: string,
    is_real: number,
    withdraw_password: number,
    loginname: string,
    realname: string,
    id_number: string,
    id_front: string,
    id_back: string,
    phone: string,
    bankname: string,
    banknumber: string,
    bankbranch: string,
    accountname: string,
    withdraw_tips: string,
    balance_frozen: number,
    balance_avail: string,
    balance_avail_newshare: string,
    total_assets: string,
    sell_amount_today: number,
    withdraw_avail: string,
    hold_value: number,
    profit: string,
    online_service: string
}

export interface IUserDeposit {
    amount: string,
    is_check: number,
    is_check_title: string;
    created_at: number,
    created_at_covert: string,
    thumb: string
}

export interface IUserchangePasswordService {
    oldpassword: string;
    password: string;
    repassword: string;
}

export interface IUserChangeWithdrawalPassword {
    withdraw_password: string;
    rewithdraw_password: string;
}
