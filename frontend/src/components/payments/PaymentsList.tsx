import {List} from "@mui/material";
import {useBunqPayments} from "../../hooks/useBunqPayments.ts";
import PaymentListElement from "./PaymentListElement.tsx";

const PaymentsList = () => {
    const {data} = useBunqPayments()
    return (
        <List>
            {data.map(payment => {
                return <PaymentListElement payment={payment}/>
            })}
        </List>
    )
}

export default PaymentsList