package com.jgdperl.plugins

import com.jgdperl.model.security.UserSession
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.sessions.*
import kotlinx.coroutines.runBlocking

fun Application.configureSecurity() {
    install(Authentication) {
        basic("auth") {
            /*skipWhen { call ->
                runBlocking {
                    val token = call.request.headers["token"] ?: return@runBlocking false
                    //return@runBlocking userAccountsRepository.getAccountByToken(token) != null
                }
            }*/
        }
    }
}
