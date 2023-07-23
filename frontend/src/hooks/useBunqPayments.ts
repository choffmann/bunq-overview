import {useQuery} from "react-query";
import {fetchBunqPayments} from "../api/BunqApi.ts";

export function useBunqPayments() {
    const toMin = (time: number) => time * 60 * 1000
    const toSec = (time: number) => time * 1000

    const {data, isLoading, isError} = useQuery({
        queryKey: 'payments',
        queryFn: fetchBunqPayments,
        cacheTime: toMin(5),
        refetchOnWindowFocus: false,
        retryDelay: toSec(3)
    })
    return {data: data ?? [], isLoading, isError}
}