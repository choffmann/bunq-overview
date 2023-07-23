package com.jgdperl.helper

import com.bunq.sdk.model.generated.endpoint.MonetaryAccountBank
import com.jgdperl.model.MonetaryAccountDto

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
    balance = this.balance.let { balance ->
        MonetaryAccountDto.MoneyValue(value = balance.value, currency = balance.currency)
    },
    alias = this.alias.map { alias ->
        MonetaryAccountDto.Alias(type = alias.type, value = alias.value, name = alias.name)
    },
    avatar = this.avatar.let { avatar ->
        MonetaryAccountDto.Avatar(
            uuid = avatar.uuid,
            anchorUuid = avatar.anchorUuid,
            image = avatar.image.map { image ->
                MonetaryAccountDto.Image(
                    attachmentPublicUuid = image.attachmentPublicUuid,
                    contentType = image.contentType,
                    height = image.height,
                    width = image.width
                )
            }
        )
    }
)