package com.jgdperl.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class PaymentDto(
    val id: Int,
    val created: String,
    val updated: String,
    @SerialName("monetary_account_id")
    val monetaryAccountId: Int,
    val description: String,
    val type: String,
    @SerialName("sub_type")
    val subType: String,
    val amount: MoneyValue,
    val alias: Alias,
    @SerialName("counterparty_alias")
    val counterpartyAlias: Alias
) {
    @Serializable
    data class Alias(
        val iban: String?,
        @SerialName("display_name")
        val displayName: String,
        val avatar: Avatar?,
        @SerialName("label_user")
        val labelUser: LabelUser?,
        val country: String,
    )
}
