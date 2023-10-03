import {useHttpsCallable} from "react-firebase-hooks/functions";
import {getFunctions} from "firebase/functions";
import {firebaseApp} from "../firebase/firebaseSetup.ts";
import {Payment} from "../model/Payment.ts";
import {useQuery} from "react-query";

export function useBunqPayments(accountId: number) {
    const [executeCallable] = useHttpsCallable(getFunctions(firebaseApp), `bunqPayments`);

    const callable = () => executeCallable({monetaryId: accountId})
        .then(res => (res?.data as Payment[]).slice(0, 50))

    const calculateWeeksDiff = (paymentDate: Date) => {
        const today = new Date()
        const currentDay = today.getDay()
        const daysUntilMonday = (currentDay + 6) % 7
        const lastMonday = new Date(today)
        lastMonday.setDate(today.getDate() - daysUntilMonday)
        lastMonday.setHours(0, 0, 0, 0)

        const paymentDateMidnight = new Date(paymentDate)
        paymentDateMidnight.setHours(0, 0, 0, 0)

        return Math.ceil((lastMonday.getTime() - paymentDateMidnight.getTime()) / (1000 * 60 * 60 * 24 * 7))
    };

    const splitToWeeks = (payments: Payment[]) => {
        const map: Map<number, Payment[]> = new Map<number, Payment[]>()
        payments.forEach(payment => {
            const calculateWeek = calculateWeeksDiff(new Date(payment.created))
            if (map.has(calculateWeek)) {
                const existingValues = map.get(calculateWeek) || []
                map.set(calculateWeek, [...existingValues, payment])
            } else {
                map.set(calculateWeek, [payment])
            }
        })

        return Array.from(map)
    };

    const {data, isFetching, error} = useQuery<Payment[]>(["payments"], callable)

    return {payments: splitToWeeks(data || []), executing: isFetching, error}
}