package com.jgdperl.helper

import de.mkammerer.argon2.Argon2Factory
import kotlin.text.toCharArray

object PasswordUtils {
    private val argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id, 16, 32)
    fun hash(password: String): String = argon2.hash(3, 64 * 1024, 1, password.toCharArray())
    fun isValidPassword(hash: String, password: String) = argon2.verify(hash, password.toCharArray())
}