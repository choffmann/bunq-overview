import {useQuery} from "react-query";
import {fetchBunqAccount} from "../api/BunqApi.ts";

export function useBunqAccount() {
    const {data, isFetching, isError, error} = useQuery({
        queryKey: 'account',
        queryFn: fetchBunqAccount,
        cacheTime: 5 * 60 * 1000, // 5 min
        refetchOnWindowFocus: false
    })
    return {data, isFetching, isError, error}
}