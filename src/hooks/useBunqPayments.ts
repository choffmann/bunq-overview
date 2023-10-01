import {useHttpsCallable} from "react-firebase-hooks/functions";
import {getFunctions} from "firebase/functions";
import {firebaseApp} from "../firebase/firebaseSetup.ts";
import {Payment} from "../model/Payment.ts";
import {useQuery} from "react-query";

export function useBunqPayments(accountId: number) {
    const [executeCallable] = useHttpsCallable(getFunctions(firebaseApp), `bunqPayments`);

    const callable = () => executeCallable({monetaryId: accountId})
        .then(res => res?.data as Payment[])

    const {data, isFetching, error} = useQuery<Payment[]>(["payments"], callable)

    return {payments: data || [], executing: isFetching, error}
}