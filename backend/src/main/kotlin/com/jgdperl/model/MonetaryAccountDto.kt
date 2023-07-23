package com.jgdperl.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MonetaryAccountDto(
    val id: Int,
    val created: String,
    val updated: String,
    val avatar: Avatar,
    val currency: String,
    val description: String,
    val balance: MoneyValue,
    val alias: List<Alias>,
    @SerialName("public_uuid")
    val publicUuid: String,
    val status: String,
    @SerialName("user_id")
    val userId: Int,
    @SerialName("display_name")
    val displayName: String,
) {
    @Serializable
    data class Avatar(
        val uuid: String,
        @SerialName("anchor_uuid")
        val anchorUuid: String,
        val image: List<Image>
    )

    @Serializable
    data class Image(
        @SerialName("attachment_public_uuid")
        val attachmentPublicUuid: String,
        @SerialName("content_type")
        val contentType: String,
        val height: Int,
        val width: Int
    )

    @Serializable
    data class MoneyValue(
        val value: String,
        val currency: String
    )

    @Serializable
    data class Alias(
        val type: String,
        val value: String,
        val name: String
    )
}