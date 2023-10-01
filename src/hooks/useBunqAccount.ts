import {getFunctions} from 'firebase/functions';
import {useHttpsCallable} from 'react-firebase-hooks/functions';
import {firebaseApp} from "../firebase/firebaseSetup.ts";
import MonetaryAccountBank from "../model/MonetaryAccountDto.ts";
import {useQuery} from "react-query";

export function useBunqAccount() {
    const [executeCallable] = useHttpsCallable(getFunctions(firebaseApp), `bunqAccount`)
    const executeFunction = () => executeCallable().then(res => res?.data as MonetaryAccountBank)
    const {data, isFetching, error} = useQuery<MonetaryAccountBank>(["monetaryBankAccount"], executeFunction)

    return {monetaryAccount: data, executing: isFetching, error}
}