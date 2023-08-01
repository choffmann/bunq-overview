import {MonetaryAccountDto} from "../model/MonetaryAccountDto.ts";
import React, {useContext} from "react";

export interface MonetaryAccountContextProps {
    data: MonetaryAccountDto,
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