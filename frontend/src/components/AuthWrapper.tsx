import React, {useState} from "react";
import LoginPage, {LoginFormData} from "../pages/LoginPage.tsx";
import AuthContext from "../context/AuthContext.ts";
export interface AuthWrapperProps {
    children?: React.ReactElement
}

const AuthWrapper = ({children}: AuthWrapperProps) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState("")

    const onSubmit = (data: LoginFormData) => {
        if (data.username === data.password) {
            setAuthenticated(true)
            setUsername(data.username)
        }
    }


    if (!authenticated) {
        return <LoginPage onSubmit={onSubmit}/>
    }

    return (
        <AuthContext.Provider value={{authenticated, username}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthWrapper