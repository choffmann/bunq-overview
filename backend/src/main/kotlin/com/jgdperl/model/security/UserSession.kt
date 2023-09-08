package com.jgdperl.model.security

import io.ktor.server.auth.*

data class UserSession(
        val name: String
) : Principal