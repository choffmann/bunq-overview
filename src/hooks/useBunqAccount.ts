import {getFunctions} from 'firebase/functions';
import {useHttpsCallable} from 'react-firebase-hooks/functions';
import {firebaseApp} from "../firebase/firebaseSetup.ts";
import {useEffect, useState} from "react";
import MonetaryAccountBank from "../model/MonetaryAccountDto.ts";

export function useBunqAccount() {
    const [monetaryAccount, setMonetaryAccount] = useState<MonetaryAccountBank>()
    const [executeCallable, executing, error] = useHttpsCallable(
        getFunctions(firebaseApp),
        `bunqAccount`
    );

    useEffect(() => {
        const executeFunction = async () => {
            const response = await executeCallable()
            setMonetaryAccount((response?.data as MonetaryAccountBank))
        }

        executeFunction().catch(console.warn)
    }, []);

    useEffect(() => {
        error && console.warn("Error in useBunqAccount", error)
    }, [error]);

    return {monetaryAccount, executing, error}
}