import React, {useContext} from "react";
import {User} from "firebase/auth";


const AuthContext = React.createContext<User | null>(null)

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (context === null) {
        throw Error("Did you create AuthContext.Provider?")
    }
    return context
}

export default AuthContext