import {useQuery} from "react-query";
import {fetchBunqAttachment} from "../api/BunqApi.ts";

export function useAttachment(uuid: string, contentType: string) {
    console.log("uuid & contentType", {uuid, contentType})
    const {data, isLoading, isError} = useQuery({
        queryKey: 'attachment',
        queryFn: () => fetchBunqAttachment(uuid, contentType),
        cacheTime: 0,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })
    return {data, isLoading, isError}
}