package com.jgdperl.helper

import com.bunq.sdk.model.generated.endpoint.MonetaryAccountBank
import com.bunq.sdk.model.generated.endpoint.Payment
import com.bunq.sdk.model.generated.`object`.Amount
import com.bunq.sdk.model.generated.`object`.Image
import com.bunq.sdk.model.generated.`object`.LabelMonetaryAccount
import com.jgdperl.model.*

fun MonetaryAccountBank.toDto(): MonetaryAccountDto = MonetaryAccountDto(
    id = this.id,
    created = this.created,
    updated = this.updated,
    currency = this.currency,
    description = this.description,
    publicUuid = this.publicUuid,
    status = this.status,
    userId = this.userId,
    displayName = this.displayName,
    balance = this.balance.toDto(),
    alias = this.alias.map { alias ->
        MonetaryAccountDto.Alias(type = alias.type, value = alias.value, name = alias.name)
    },
    avatar = this.avatar.toDto()
)

fun Payment.toDto() = PaymentDto(
    id = this.id,
    created = this.created,
    updated = this.updated,
    monetaryAccountId = this.monetaryAccountId,
    description = this.description,
    type = this.type,
    subType = this.subType,
    amount = this.amount.toDto(),
    alias = this.alias.toDto(),
    counterpartyAlias = this.counterpartyAlias.toDto()
)

private fun Amount.toDto() = MoneyValue(value = this.value, currency = this.currency)

private fun LabelMonetaryAccount.toDto() = PaymentDto.Alias(
    iban = this.iban,
    displayName = this.displayName,
    avatar = this.avatar?.toDto(),
    labelUser = this.labelUser.toDto(),
    country = this.country
)

private fun com.bunq.sdk.model.generated.`object`.Avatar.toDto() = Avatar(
    uuid = this.uuid,
    anchorUuid = this.anchorUuid,
    image = this.image.map { it.toDto() },
)

private fun Image.toDto() = Avatar.Image(
    attachmentPublicUuid = this.attachmentPublicUuid,
    contentType = this.contentType,
    height = this.height,
    width = this.width
)

private fun com.bunq.sdk.model.generated.`object`.LabelUser.toDto() = LabelUser(
    uuid = this.uuid,
    displayName = this.displayName,
    country = this.country,
    publicNickName = this.publicNickName,
    avatar = this.avatar?.toDto()
)