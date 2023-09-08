package com.jgdperl.bunq

import com.bunq.sdk.context.ApiContext
import com.bunq.sdk.context.ApiEnvironmentType
import com.bunq.sdk.context.BunqContext
import com.bunq.sdk.http.Pagination
import com.bunq.sdk.model.generated.endpoint.AttachmentPublicContent
import com.bunq.sdk.model.generated.endpoint.MonetaryAccountBank
import com.bunq.sdk.model.generated.endpoint.Payment
import java.io.File

const val DEVICE_DESCRIPTION = "bunq-overview"
const val FILE_BUNQ_CONF = "bunq-production.conf"
const val DEFAULT_PAGINATION_COUNT = 100

class BunqLib {
    private val iban: String = System.getenv("IBAN") ?: throw Exception("IBAN not set")
    private val apiKey: String = System.getenv("API_KEY") ?: throw Exception("API_KEY not set")
    lateinit var monetaryAccountBank: MonetaryAccountBank

    init {
        setupContext()
        getMonetaryAccount()
    }

    fun updateContext() {
        BunqContext.getApiContext().save(FILE_BUNQ_CONF)
    }

    private fun setupContext() {
        if (bunqFileNotExists()) {
            println("Create Bunq .conf file")
            ApiContext.create(ApiEnvironmentType.PRODUCTION, apiKey, DEVICE_DESCRIPTION).save(FILE_BUNQ_CONF)
        }

        val apiContext = ApiContext.restore(FILE_BUNQ_CONF)
        apiContext.ensureSessionActive()
        apiContext.save(FILE_BUNQ_CONF)
        BunqContext.loadApiContext(apiContext)
    }

    private fun bunqFileNotExists() = !File(FILE_BUNQ_CONF).exists()

    private fun getMonetaryAccount() {
        monetaryAccountBank = MonetaryAccountBank.list().value.first { account ->
            account.alias.any { it.value.equals(iban) }
        }
    }

    fun getPayments(): List<Payment> {
        val pagination = Pagination()
        pagination.count = DEFAULT_PAGINATION_COUNT
        return Payment.list(monetaryAccountBank.id, pagination.urlParamsCountOnly).value.filter { payment ->
            payment.alias.iban == iban
        }
    }

    fun getImage(uuid: String): ByteArray = AttachmentPublicContent.list(uuid).value
}