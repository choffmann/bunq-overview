export interface Payment {
  id: number;
  created: string;
  updated: string;
  monetary_account_id: number;
  amount: Amount;
  description: string;
  type: string;
  merchant_reference: unknown;
  alias: PaymentAlias;
  counterparty_alias: PaymentAlias;
  attachment: unknown[];
  geolocation: unknown;
  batch_id: unknown;
  scheduled_id: unknown;
  address_billing: unknown;
  address_shipping: unknown;
  sub_type: string;
  request_reference_split_the_bill: unknown[];
  balance_after_mutation: Amount;
  payment_auto_allocate_instance: unknown;
}

export interface Amount {
  currency: string;
  value: string;
}

export interface PaymentAlias {
  iban: string;
  is_light: boolean;
  display_name: string;
  avatar: Avatar;
  label_user: LabelUser;
  country: string;
}

export interface Avatar {
  uuid: string;
  image: AvatarImage[];
  anchor_uuid: string;
  style: string;
}

export interface AvatarImage {
  attachment_public_uuid: string;
  height: number;
  width: number;
  content_type: string;
  urls: { type: string; url: string }[];
}

export interface LabelUser {
  uuid?: string;
  display_name: string;
  country: string;
  public_nick_name: string;
  avatar?: Avatar;
}
