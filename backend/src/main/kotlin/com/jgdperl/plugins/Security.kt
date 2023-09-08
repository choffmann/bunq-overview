package com.jgdperl.plugins

import com.jgdperl.model.security.UserSession
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.sessions.*

const val REDIRECT_LOGIN_URL = "http://localhost:5173/login"

fun Application.configureSecurity() {
    install(Authentication) {
        form("auth-form") {
            userParamName = "username"
            passwordParamName = "password"
            validate { credentials ->
                if (credentials.name == credentials.password) {
                    UserIdPrincipal(credentials.name)
                } else null
            }
        }
        session<UserSession>("auth-session") {
            validate { session ->
                if (session.name.startsWith("jet")) {
                    session
                } else null
            }
            challenge {
                call.respondRedirect(REDIRECT_LOGIN_URL)
            }
        }
    }
    install(Sessions) {
        cookie<UserSession>("user_session") {
            cookie.path = "/"
            cookie.maxAgeInSeconds = 60
        }
    }
}
