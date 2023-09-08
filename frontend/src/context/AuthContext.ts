import React, {useContext} from "react";

export interface AuthContextProps {
    authenticated: boolean
    username: string
}

const AuthContext = React.createContext<AuthContextProps | null>(null)

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (context === null) {
        throw Error("Did you create AuthContext.Provider?")
    }
    return context
}

export default AuthContext