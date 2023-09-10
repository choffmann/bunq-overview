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
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const onSubmit = (data: LoginFormData) => {
        console.log("Submit", data)
    }

    const onGoogle = () => {
        signInWithGoogle().then(r => console.log(r))
    }

    if (loggedInUser === undefined || loggedInUser === null) {
        return <LoginPage onSubmit={onSubmit} onGoogle={onGoogle}/>
    }

    return (
        <AuthContext.Provider value={loggedInUser}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider