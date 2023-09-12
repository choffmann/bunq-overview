import React from "react";
import LoginPage, {LoginFormData} from "../pages/LoginPage.tsx";
import AuthContext from "../context/AuthContext.ts";
import {auth} from "../firebase/firebaseSetup.ts";
import {useAuthState, useSignInWithGoogle} from "react-firebase-hooks/auth";

export interface AuthProviderProps {
    children?: React.ReactElement
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [loggedInUser] = useAuthState(auth)
    const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

    const onSubmit = (data: LoginFormData) => {
        console.log("Submit", data)
    }
    
    if (loggedInUser === undefined || loggedInUser === null) {
        return <LoginPage onSubmit={onSubmit} google={{onClick: () => signInWithGoogle(), loading, error}}/>
    }

    return (
        <AuthContext.Provider value={loggedInUser}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider