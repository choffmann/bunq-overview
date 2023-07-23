import {Avatar} from "./Avatar.ts";
import {LabelUser} from "./LabelUser.ts";

export interface Payment {
    id: number;
    created: string;
    updated: string;
    monetary_account_id: number;
    description: string;
    type: string;
    sub_type: string;
    amount: MoneyValue;
    alias: Alias;
    counterparty_alias: Alias;
}

interface Alias {
    iban?: string;
    display_name: string;
    avatar?: Avatar;
    label_user?: LabelUser;
    country: string;
}

export interface MoneyValue {
    value: string;
    currency: string;
}