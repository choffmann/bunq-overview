package com.jgdperl.model.database

import org.jetbrains.exposed.dao.id.IntIdTable

object UserTable: IntIdTable() {
    val username = text("username")
    val firstname = text("firstname")
    val lastname = text("lastname")
    val password = text("password")
}
