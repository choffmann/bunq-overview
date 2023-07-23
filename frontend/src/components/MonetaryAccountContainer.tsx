import {useBunqAccount} from "../hooks/useBunqAccount.ts";
import MonetaryAccountContext, {MonetaryAccountContextProps} from "../context/MonetaryAccountContext.ts";
import {ReactNode} from "react";

export interface MonetaryAccountContainerProps {
    children?: ReactNode
}

const MonetaryAccountContainer = ({children}: MonetaryAccountContainerProps) => {
    const {data, isError, isLoading} = useBunqAccount()

    const createProvider = (monetaryAccount: MonetaryAccountContextProps) => {
        return (
            <MonetaryAccountContext.Provider value={monetaryAccount}>
                {children}
            </MonetaryAccountContext.Provider>
        )
    }

    return (
        <>
            {data === undefined ? "" : createProvider({data, isError, isLoading})}
        </>
    )

}

export default MonetaryAccountContainer