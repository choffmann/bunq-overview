package com.jgdperl.model

import kotlinx.serialization.Serializable

@Serializable
data class MoneyValue(
    val value: String,
    val currency: String
)
