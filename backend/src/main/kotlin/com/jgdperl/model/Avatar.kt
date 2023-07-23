package com.jgdperl.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Avatar(
    val uuid: String,
    @SerialName("anchor_uuid")
    val anchorUuid: String?,
    val image: List<Image>,
    val style: String? = null
) {
    @Serializable
    data class Image(
        @SerialName("attachment_public_uuid")
        val attachmentPublicUuid: String,
        @SerialName("content_type")
        val contentType: String,
        val height: Int,
        val width: Int
    )
}
