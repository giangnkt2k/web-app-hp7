export interface IDepositAccount {
    created_at: string;
    updated_at: string;
    id: number;
    bank_name: string;
    account_number: string;
    branch: string;
    account_holder: string;
    is_public: boolean;
    is_enabled: boolean;
}
