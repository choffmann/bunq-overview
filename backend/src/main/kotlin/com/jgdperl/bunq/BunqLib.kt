package com.jgdperl.bunq

import com.bunq.sdk.context.ApiContext
import com.bunq.sdk.context.ApiEnvironmentType
import com.bunq.sdk.context.BunqContext
import com.bunq.sdk.model.generated.endpoint.MonetaryAccountBank
import com.bunq.sdk.model.generated.endpoint.Payment
import java.io.File

const val API_KEY = "sandbox_0955aad5dbd1f480a9729f985776f57e6f79751b0a17229aa8ac0a17"
const val DEVICE_DESCRIPTION = "bunq-overview"
const val FILE_BUNQ_CONF = "bunq-sandbox.conf"
const val IBAN = "DE37370190001010279078"
const val IBAN_SANBOX = "NL70BUNQ2061192157"

class BunqLib {
    init {
        setupContext()
    }

    fun updateContext() {
        BunqContext.getApiContext().save(FILE_BUNQ_CONF)
    }

    private fun setupContext() {
        if (bunqFileNotExists()) {
            ApiContext.create(ApiEnvironmentType.SANDBOX, API_KEY, DEVICE_DESCRIPTION).save(FILE_BUNQ_CONF)
        }

        val apiContext = ApiContext.restore(FILE_BUNQ_CONF)
        apiContext.ensureSessionActive()
        apiContext.save(FILE_BUNQ_CONF)
        BunqContext.loadApiContext(apiContext)
    }

    private fun bunqFileNotExists() = !File(FILE_BUNQ_CONF).exists()

    fun getMonetaryAccount(): MonetaryAccountBank {
        return MonetaryAccountBank.list().value.first { account ->
            account.alias.any { it.value.equals(IBAN_SANBOX) }
        }
    }
}