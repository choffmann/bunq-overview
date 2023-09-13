import {useMonetaryAccountContext} from "../context/MonetaryAccountContext.ts";
import {Box, CircularProgress, Container} from "@mui/material";
import PaymentsList from "./payments/PaymentsList.tsx";
import BalanceView from "./balance/BalanceView.tsx";

const BunqView = () => {
    const {data, isFetching} = useMonetaryAccountContext()

    const loading = () => <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    }}>
        <CircularProgress/>
    </Box>

    return (
        <Container>
            {isFetching ? loading() :
                <Box>
                    <BalanceView monetaryAccount={data}/>
                    <PaymentsList/>
                </Box>
            }
        </Container>
    )
}

export default BunqView