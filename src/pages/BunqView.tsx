import {useMonetaryAccountContext} from "../context/MonetaryAccountContext.ts";
import {Container} from "@mui/material";
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
            <Container>
                {data &&
                    <>
                        <BalanceView monetaryAccount={data}/>
                        <PaymentsList/>
                    </>
                }
            </Container>
        </>
    )
}

export default BunqView