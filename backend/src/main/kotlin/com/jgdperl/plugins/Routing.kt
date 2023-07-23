package com.jgdperl.plugins

import com.jgdperl.bunq.BunqLib
import com.jgdperl.helper.toDto
import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.get

fun Application.configureRouting() {
    val bunq = BunqLib()
    routing {
        staticResources("/", "dist")
        route("/api") {
            get("/account") {
                call.respond(bunq.getMonetaryAccount().toDto())
                bunq.updateContext()
            }

            get("/payments") {
                call.respond(bunq.getPayments().map { it.toDto() })
                bunq.updateContext()
            }

            get("/attachment/{uuid}") {
                call.parameters["uuid"]?.let { uuid ->
                    call.respondBytes(
                        contentType = call.request.headers["Content-Type"]?.let { ContentType.parse(it) },
                        status = HttpStatusCode.OK,
                        provider = { bunq.getImage(uuid) })
                    bunq.updateContext()
                } ?: call.respondText("Missing uuid parameter")
            }
        }
    }
}
