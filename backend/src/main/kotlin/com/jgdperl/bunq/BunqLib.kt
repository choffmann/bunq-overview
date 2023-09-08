package com.jgdperl.bunq

import com.bunq.sdk.context.ApiContext
import com.bunq.sdk.context.ApiEnvironmentType
import com.bunq.sdk.context.BunqContext
import com.bunq.sdk.http.Pagination
import com.bunq.sdk.model.generated.endpoint.AttachmentPublicContent
import com.bunq.sdk.model.generated.endpoint.MonetaryAccountBank
import com.bunq.sdk.model.generated.endpoint.Payment
import com.jgdperl.config.DotEnv.apiKey
import com.jgdperl.config.DotEnv.iban
import com.jgdperl.config.DotEnv.isProduction
import java.io.File

const val DEVICE_DESCRIPTION = "bunq-overview"
const val DEFAULT_PAGINATION_COUNT = 100

class BunqLib {
    private val apiEnvironment = if (isProduction) ApiEnvironmentType.PRODUCTION else ApiEnvironmentType.SANDBOX
    private val confFileName = if (isProduction) "bunq-production.conf" else "bunq-sandbox.conf"

    init {
        setupContext()
    }

    fun updateContext() {
        BunqContext.getApiContext().save(confFileName)
    }

    private fun setupContext() {
        if (bunqFileNotExists()) {
            println("Create Bunq .conf file")
            ApiContext.create(apiEnvironment, apiKey, DEVICE_DESCRIPTION).save(confFileName)
        }

        val apiContext = ApiContext.restore(confFileName)
        apiContext.ensureSessionActive()
        apiContext.save(confFileName)
        BunqContext.loadApiContext(apiContext)
    }

    private fun bunqFileNotExists() = !File(confFileName).exists()

    fun getMonetaryAccount(): MonetaryAccountBank {
        return MonetaryAccountBank.list().value.first { account ->
            account.alias.any { it.value.equals(iban) }
        }
    }

    fun getPayments(): List<Payment> {
        val pagination = Pagination()
        pagination.count = DEFAULT_PAGINATION_COUNT
        return Payment.list(getMonetaryAccount().id, pagination.urlParamsCountOnly).value.filter { payment ->
            payment.alias.iban == iban
        }
    }

    fun getImage(uuid: String): ByteArray = AttachmentPublicContent.list(uuid).value
}