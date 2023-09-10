export default interface MonetaryAccountBank {
    id: number
    created: string
    updated: string
    alias: Alias[]
    avatar: Avatar
    balance: Balance
    country: string
    currency: string
    display_name: string
    daily_limit: DailyLimit
    description: string
    public_uuid: string
    status: string
    sub_status: string
    timezone: string
    user_id: number
    monetary_account_profile: MonetaryAccountProfile
    setting: Setting
    connected_cards: any[]
    budget: any
    overdraft_limit: OverdraftLimit
    all_auto_save_id: any[]
    total_request_pending: TotalRequestPending
}

export interface Alias {
    type: string
    value: string
    name: string
}

export interface Avatar {
    uuid: string
    image: Image[]
    anchor_uuid: string
    style: string
}

export interface Image {
    attachment_public_uuid: string
    height: number
    width: number
    content_type: string
    urls: Url[]
}

export interface Url {
    type: string
    url: string
}

export interface Balance {
    currency: string
    value: string
}

export interface DailyLimit {
    currency: string
    value: string
}

export interface MonetaryAccountProfile {
    profile_fill: ProfileFill
    profile_drain: any
    profile_action_required: string
    profile_amount_required: ProfileAmountRequired
}

export interface ProfileFill {
    status: string
    balance_preferred: BalancePreferred
    balance_threshold_low: BalanceThresholdLow
}

export interface BalancePreferred {
    currency: string
    value: string
}

export interface BalanceThresholdLow {
    currency: string
    value: string
}

export interface ProfileAmountRequired {
    currency: string
    value: string
}

export interface Setting {
    color: string
    icon: any
    default_avatar_status: string
    restriction_chat: string
    sdd_expiration_action: string
}

export interface OverdraftLimit {
    currency: string
    value: string
}

export interface TotalRequestPending {
    currency: string
    value: string
}