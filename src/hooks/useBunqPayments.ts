import {useEffect, useState} from "react";
import {useHttpsCallable} from "react-firebase-hooks/functions";
import {getFunctions} from "firebase/functions";
import {firebaseApp} from "../firebase/firebaseSetup.ts";
import {Payment} from "../model/Payment.ts";

export function useBunqPayments(accountId: number) {
    const [payments, setPayments] = useState<Payment[]>([])
    const [executeCallable, executing, error] = useHttpsCallable(
        getFunctions(firebaseApp),
        `bunq/api/v1/payments/${accountId}`
    );

    useEffect(() => {
        const executeFunction = async () => {
            const response = await executeCallable()
            setPayments((response?.data as Payment[]))
        }

        executeFunction().catch(console.warn)
    }, []);

    return {payments, executing, error}
}