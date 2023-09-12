import {List, ListItem, Typography} from "@mui/material";
import {useBunqPayments} from "../../hooks/useBunqPayments.ts";
import PaymentListElement from "./PaymentListElement.tsx";
import {useMonetaryAccountContext} from "../../context/MonetaryAccountContext.ts";

const PaymentsList = () => {
    const {data} = useMonetaryAccountContext()
    const {payments} = useBunqPayments(data.id)

    const emptyList =
        <ListItem>
            <Typography color="text.secondary">Es sind keine Einträge verfügbar</Typography>
        </ListItem>

    return (
        <List>
            {payments.length <= 0 ? emptyList :
                payments.map(payment => {
                    return <PaymentListElement payment={payment}/>
                })
            }
        </List>
    )
}

export default PaymentsList