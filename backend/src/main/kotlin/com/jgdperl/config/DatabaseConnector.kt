package com.jgdperl.config

import com.jgdperl.helper.PasswordUtils
import com.jgdperl.model.database.UserTable
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.TransactionManager
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseConnector {
    fun init() {
        val db = Database.connect("jdbc:postgresql://localhost:5432/bunq", driver = "org.postgresql.Driver",
                user = "postgres", password = "geheim")
        TransactionManager.defaultDatabase = db
        createTables()
        insertDemoData()
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
            newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun createTables() = transaction {
        SchemaUtils.create(UserTable)
    }

    private fun insertDemoData() = transaction {
        UserTable.insert {
            it[username] = "choffmann"
            it[firstname] = "Cedrik"
            it[lastname] = "Hoffmann"
            it[password] = PasswordUtils.hash("geheim")
        }
    }
}