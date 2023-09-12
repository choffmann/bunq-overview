export interface SessionResponse {
    Id: Id
    Token: Token
    UserPerson: UserPerson
}

export interface Id {
    id: number
}

export interface Token {
    id: number
    created: string
    updated: string
    token: string
}

export interface UserPerson {
    id: number
    created: string
    updated: string
    alias: Alias[]
    avatar: Avatar
    status: string
    sub_status: string
    public_uuid: string
    display_name: string
    public_nick_name: string
    language: string
    region: string
    session_timeout: number
    daily_limit_without_confirmation_login: DailyLimitWithoutConfirmationLogin
    relations: any[]
    tax_resident: any
    notification_filters: NotificationFilter[]
    address_main: AddressMain
    address_postal: AddressPostal
    first_name: string
    middle_name: string
    last_name: string
    legal_name: string
    date_of_birth: string
    place_of_birth: string
    country_of_birth: string
    nationality: string
    gender: string
    version_terms_of_service: string
    deny_reason: any
    document_issuing_authority: any
    document_expiry_date: any
    document_status: string
    is_primary_document: boolean
    customer: Customer
    customer_limit: CustomerLimit
    billing_contract: BillingContract[]
    pack_membership: any
    premium_trial: any
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

export interface DailyLimitWithoutConfirmationLogin {
    currency: string
    value: string
}

export interface NotificationFilter {
    notification_delivery_method: string
    category: string
}

export interface AddressMain {
    street: string
    house_number: string
    postal_code: string
    city: string
    country: string
    province: any
    extra: any
    mailbox_name: any
    is_user_address_updated: boolean
}

export interface AddressPostal {
    street: string
    house_number: string
    postal_code: string
    city: string
    country: string
    province: any
    extra: any
    mailbox_name: string
    is_user_address_updated: boolean
}

export interface Customer {
    id: number
    created: string
    updated: string
    billing_account_id: number
    invoice_notification_preference: string
}

export interface CustomerLimit {
    limit_monetary_account: number
    limit_monetary_account_remaining: number
    limit_card_debit_maestro: number
    limit_card_debit_mastercard: number
    limit_card_wildcard: number
    limit_card_debit_wildcard: number
    limit_card_debit_maestro_virtual_subscription: number
    limit_card_debit_maestro_virtual_total: number
    limit_card_debit_mastercard_virtual_subscription: number
    limit_card_debit_mastercard_virtual_total: number
    limit_card_replacement: number
    limit_amount_monthly: any
    spent_amount_monthly: any
    limit_card_credit_mastercard: number
}

export interface BillingContract {
    BillingContractSubscription: BillingContractSubscription
}

export interface BillingContractSubscription {
    id: number
    created: string
    updated: string
    contract_date_start: string
    contract_date_end: any
    contract_version: number
    subscription_type: string
    subscription_type_downgrade: any
    status: string
    sub_status: string
}
