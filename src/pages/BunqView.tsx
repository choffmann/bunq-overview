import {useMonetaryAccountContext} from "../context/MonetaryAccountContext.ts";
import PaymentsList from "../components/payments/PaymentsList.tsx";
import BalanceView from "../components/balance/BalanceView.tsx";
import {useEffect} from "react";
import {useAppBar} from "../context/AppBarContext.tsx";

const BunqView = () => {
    const appBar = useAppBar()
    const {data, isFetching} = useMonetaryAccountContext()

    useEffect(() => {
        appBar.search.show()
        appBar.setTitle("Übersicht")

        return () => appBar.search.hidde()
    }, []);

    useEffect(() => {
        appBar.loading.setLoading(isFetching)
    }, [isFetching])

    return (
        <>
            {data &&
                <>
                    <BalanceView monetaryAccount={data}/>
                    <PaymentsList/>
                </>
            }
        </>
    )
}

export default BunqView