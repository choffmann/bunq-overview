import {useBunqAccount} from "../hooks/useBunqAccount.ts";
import MonetaryAccountContext, {MonetaryAccountContextProps} from "../context/MonetaryAccountContext.ts";
import {ReactNode} from "react";
import {CircularProgress} from "@mui/material";

export interface MonetaryAccountContainerProps {
    children?: ReactNode
}

const MonetaryAccountContainer = ({children}: MonetaryAccountContainerProps) => {
    const {monetaryAccount, executing, error} = useBunqAccount()

    const createProvider = (monetaryAccount: MonetaryAccountContextProps) => {
        return (
            <MonetaryAccountContext.Provider value={monetaryAccount}>
                {children}
            </MonetaryAccountContext.Provider>
        )
    }

    return (
        <>
            {monetaryAccount === undefined ? <CircularProgress/> : createProvider({data: monetaryAccount, isError: error !== undefined, isFetching: executing})}
        </>
    )

}

export default MonetaryAccountContainer