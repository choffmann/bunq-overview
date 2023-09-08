package com.jgdperl.plugins

import com.bunq.sdk.model.generated.endpoint.User
import com.jgdperl.bunq.BunqLib
import com.jgdperl.helper.toDto
import com.jgdperl.model.security.UserSession
import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.get
import io.ktor.server.sessions.*

fun Application.configureRouting() {
    val bunq = BunqLib()
    routing {
        route("/api") {
            authenticate("auth-form") {
                post("/login") {
                    val userName = call.principal<UserIdPrincipal>()?.name.toString()
                    call.sessions.set(UserSession(name = userName))
                    call.respondRedirect("/api/hello")
                }
            }
            
            authenticate("auth-session") {
                get("/hello") {
                    val userSession = call.principal<UserSession>()
                    call.respondText("Hello, ${userSession?.name}!")
                }
            }

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
