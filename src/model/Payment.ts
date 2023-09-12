import {Avatar} from "./MonetaryAccountDto";
import {LabelUser} from "./LabelUser";

export interface Payment {
    id: number
    created: string
    updated: string
    monetary_account_id: number
    amount: Amount
    description: string
    type: string
    merchant_reference: any
    alias: Alias
    counterparty_alias: CounterpartyAlias
    attachment: any[]
    geolocation: any
    batch_id: any
    scheduled_id: any
    address_billing: any
    address_shipping: any
    sub_type: string
    request_reference_split_the_bill: any[]
    balance_after_mutation: BalanceAfterMutation
    payment_auto_allocate_instance: any
}

export interface Amount {
    currency: string
    value: string
}

export interface Alias {
    iban: string
    is_light: boolean
    display_name: string
    avatar: Avatar
    label_user: LabelUser
    country: string
}

export interface CounterpartyAlias {
    iban: string
    is_light: boolean
    display_name: string
    avatar: Avatar
    label_user: LabelUser
    country: string
}

export interface BalanceAfterMutation {
    currency: string
    value: string
}