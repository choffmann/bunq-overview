import {useMonetaryAccountContext} from "../context/MonetaryAccountContext.ts";
import {Container, LinearProgress} from "@mui/material";
import PaymentsList from "./payments/PaymentsList.tsx";
import BalanceView from "./balance/BalanceView.tsx";

const BunqView = () => {
    const {data, isFetching} = useMonetaryAccountContext()
    return (
        <>
            {isFetching ? <LinearProgress/> :
                <Container>
                    <BalanceView monetaryAccount={data}/>
                    <PaymentsList/>
                </Container>
            }
        </>
    )
}

export default BunqView