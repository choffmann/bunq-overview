package com.jgdperl.model.database

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class UserEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(UserTable)

    var username by UserTable.username
    var firstname by UserTable.firstname
    var lastname by UserTable.lastname
    var password by UserTable.password
}