import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/firebaseSetup.ts";
import {Navigate} from "react-router-dom";

export interface PrivateRouteProps extends React.PropsWithChildren {

}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const [user] = useAuthState(auth)

    if (user === null) {
        return <Navigate to="/login"/>
    } else {
        return children
    }

}

export default PrivateRoute