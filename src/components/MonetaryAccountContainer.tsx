import {useBunqAccount} from "../hooks/useBunqAccount.ts";
import MonetaryAccountContext, {MonetaryAccountContextProps} from "../context/MonetaryAccountContext.ts";
import {ReactNode} from "react";

export interface MonetaryAccountContainerProps {
    children?: ReactNode
}

const MonetaryAccountContainer = ({children}: MonetaryAccountContainerProps) => {
    const {monetaryAccount, isLoading, error} = useBunqAccount()

    const createProvider = (monetaryAccount: MonetaryAccountContextProps) => {
        return (
            <MonetaryAccountContext.Provider value={monetaryAccount}>
                {children}
            </MonetaryAccountContext.Provider>
        )
    }

    return (
        <>
            {monetaryAccount && createProvider({data: monetaryAccount, isError: error !== undefined, isFetching: isLoading})}
        </>
    )

}

export default MonetaryAccountContainer