package com.jgdperl.plugins

import com.jgdperl.bunq.BunqLib
import com.jgdperl.helper.toDto
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.http.content.*
import io.ktor.server.application.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }

        get("/account") {
            val bunq = BunqLib()
            call.respond(bunq.getMonetaryAccount().toDto())
            bunq.updateContext()
        }
    }
}
