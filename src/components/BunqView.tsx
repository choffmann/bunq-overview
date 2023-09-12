import {useMonetaryAccountContext} from "../context/MonetaryAccountContext.ts";
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import PaymentsList from "./payments/PaymentsList.tsx";
import BalanceView from "./balance/BalanceView.tsx";
import ErrorBoundary from "./error/ErrorBoundary.tsx";

const BunqView = () => {
    const {data, isFetching} = useMonetaryAccountContext()
    return (
        <>
            {isFetching ? <LinearProgress/> :
                <Container>
                    <ErrorBoundary>
                        {isFetching ? <CircularProgress/> : <>
                            <BalanceView monetaryAccount={data}/>
                            <PaymentsList/>
                        </>}
                    </ErrorBoundary>
                </Container>
            }
        </>
    )
}

export default BunqView