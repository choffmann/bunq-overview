export interface MonetaryAccountBank {
  id: number;
  created: string;
  updated: string;
  alias: Pointer[];
  avatar: AccountAvatar;
  balance: MoneyAmount;
  country: string;
  currency: string;
  display_name: string;
  daily_limit: MoneyAmount;
  description: string;
  public_uuid: string;
  status: string;
  sub_status: string;
  timezone: string;
  user_id: number;
  monetary_account_profile: MonetaryAccountProfile;
  setting: AccountSetting;
  connected_cards: unknown[];
  budget: unknown;
  overdraft_limit: MoneyAmount;
  all_auto_save_id: unknown[];
  total_request_pending: MoneyAmount;
}

export interface Pointer {
  type: string;
  value: string;
  name: string;
}

export interface AccountAvatar {
  uuid: string;
  image: {
    attachment_public_uuid: string;
    height: number;
    width: number;
    content_type: string;
    urls: { type: string; url: string }[];
  }[];
  anchor_uuid: string;
  style: string;
}

export interface MoneyAmount {
  currency: string;
  value: string;
}

export interface MonetaryAccountProfile {
  profile_fill: {
    status: string;
    balance_preferred: MoneyAmount;
    balance_threshold_low: MoneyAmount;
  };
  profile_drain: unknown;
  profile_action_required: string;
  profile_amount_required: MoneyAmount;
}

export interface AccountSetting {
  color: string;
  icon: unknown;
  default_avatar_status: string;
  restriction_chat: string;
  sdd_expiration_action: string;
}
