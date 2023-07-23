import {Avatar} from "./Avatar.ts";
import {MoneyValue} from "./PaymentDto.ts";

export interface MonetaryAccountDto {
    id: number;
    created: string;
    updated: string;
    avatar: Avatar;
    currency: string;
    description: string;
    balance: MoneyValue;
    alias: Alias[];
    public_uuid: string;
    status: string;
    user_id: number;
    display_name: string;
}

interface Alias {
    type: string;
    value: string;
    name: string;
}