import {User} from "firebase/auth";
import React, {useContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase/firebaseSetup.ts";

export interface AuthContextProps {
    user?: User
}

const AuthContext = React.createContext<AuthContextProps | null>(null)

export interface AuthContextProviderProps extends React.PropsWithChildren {

}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === null) {
        throw Error("Did you create AuthContext.Provider?")
    }
    return context
}

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [user, loading] = useAuthState(auth)

    const context: AuthContextProps = {
        user: user ?? undefined
    }

    return (
        <AuthContext.Provider value={context}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider