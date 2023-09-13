import {Box, CircularProgress, List, ListItem, Typography} from "@mui/material";
import {useBunqPayments} from "../../hooks/useBunqPayments.ts";
import PaymentListElement from "./PaymentListElement.tsx";
import {useMonetaryAccountContext} from "../../context/MonetaryAccountContext.ts";

const PaymentsList = () => {
    const {data} = useMonetaryAccountContext()
    const {payments, executing} = useBunqPayments(data.id)

    const emptyList =
        <ListItem>
            <Typography color="text.secondary">Es sind keine Einträge verfügbar</Typography>
        </ListItem>

    const loading = () => {
        return <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
        }}>
            <CircularProgress/>
        </Box>
    }

    return (
        <List>
            {executing && payments.length <= 0 && loading()}
            {payments.length <= 0 ? emptyList && !executing :
                payments.map(payment => {
                    return <PaymentListElement payment={payment}/>
                })
            }
        </List>
    )
}

export default PaymentsList