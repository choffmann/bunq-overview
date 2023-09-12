import React, {useContext} from "react";
import MonetaryAccountBank from "../model/MonetaryAccountDto.ts";
export interface MonetaryAccountContextProps {
    data: MonetaryAccountBank,
    isFetching: boolean,
    isError: boolean
}

const MonetaryAccountContext = React.createContext<MonetaryAccountContextProps | null>(null)

export function useMonetaryAccountContext() {
    const context = useContext(MonetaryAccountContext)
    if (context === null) {
        throw Error("Did you create MonetaryAccountContext.Provider?")
    }
    return context
}

export default MonetaryAccountContext