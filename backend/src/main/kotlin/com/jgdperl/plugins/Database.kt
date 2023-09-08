package com.jgdperl.plugins

import com.jgdperl.config.DatabaseConnector
import io.ktor.server.application.*

fun Application.configureDatabase() {
    DatabaseConnector.init()
}