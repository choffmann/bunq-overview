import {useMonetaryAccountContext} from "../context/MonetaryAccountContext.ts";
import {Box, CircularProgress, Container} from "@mui/material";
import PaymentsList from "./payments/PaymentsList.tsx";
import BalanceView from "./balance/BalanceView.tsx";
import {useEffect, useState} from "react";
import AppDrawer from "./appbar/AppDrawer.tsx";

const BunqView = () => {
    const {data, isFetching} = useMonetaryAccountContext()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(isFetching)
    }, [isFetching])

    const loading = () => <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    }}>
        <CircularProgress/>
    </Box>

    return (
        <AppDrawer>
            <Container>
                {isLoading ? loading() :
                    <>
                        <BalanceView monetaryAccount={data}/>
                        <PaymentsList/>
                    </>
                }
            </Container>
        </AppDrawer>
    )
}

export default BunqView