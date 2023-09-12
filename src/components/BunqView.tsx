import {useMonetaryAccountContext} from "../context/MonetaryAccountContext.ts";
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import PaymentsList from "./payments/PaymentsList.tsx";
import BalanceView from "./balance/BalanceView.tsx";

const BunqView = () => {
    const {data, isFetching} = useMonetaryAccountContext()
    return (
        <>
            {isFetching ? <LinearProgress/> :
                <Container>
                    {isFetching ? <CircularProgress /> : <>
                        <BalanceView monetaryAccount={data}/>
                        <PaymentsList/>
                    </>}
                </Container>
            }
        </>
    )
}

export default BunqView