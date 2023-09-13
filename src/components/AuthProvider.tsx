import React from "react";
import LoginPage, {LoginFormData} from "../pages/LoginPage.tsx";
import AuthContext from "../context/AuthContext.ts";
import {auth} from "../firebase/firebaseSetup.ts";
import {useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";

export interface AuthProviderProps {
    children?: React.ReactElement
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [loggedInUser] = useAuthState(auth)
    const [signInWithGoogle, _g, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmail, _e, emailLoading, emailError] = useSignInWithEmailAndPassword(auth)

    const onSubmit = (data: LoginFormData) => {
        signInWithEmail(data.username, data.password).catch(console.warn)
    }
    
    if (loggedInUser === undefined || loggedInUser === null) {
        return <LoginPage submit={{onClick: onSubmit, loading: emailLoading, error: emailError}}
                          google={{onClick: () => signInWithGoogle(), loading: googleLoading, error: googleError}}/>
    }

    return (
        <AuthContext.Provider value={loggedInUser}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider