package com.jgdperl.config

import io.github.cdimascio.dotenv.dotenv

object DotEnv {
    private val dotenv = dotenv {
        directory = "backend/env"
        filename = if (isProduction) "production.env" else "develop.env"
    }

    val apiKey = dotenv["API_KEY"] ?: throw Exception("API_KEY not set")
    val iban = dotenv["IBAN"] ?: throw Exception("IBAN not set")
    val isProduction = System.getenv("PRODUCTION")?.equals("true") ?: false
}