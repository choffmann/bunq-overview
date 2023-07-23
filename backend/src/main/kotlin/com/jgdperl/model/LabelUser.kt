package com.jgdperl.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class LabelUser(
    val uuid: String?,
    @SerialName("display_name")
    val displayName: String,
    val country: String,
    @SerialName("public_nick_name")
    val publicNickName: String,
    val avatar: Avatar?
)
