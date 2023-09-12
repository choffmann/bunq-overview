import {List} from "@mui/material";
import {useBunqPayments} from "../../hooks/useBunqPayments.ts";
import PaymentListElement from "./PaymentListElement.tsx";
import {useMonetaryAccountContext} from "../../context/MonetaryAccountContext.ts";

const PaymentsList = () => {
    const {data} = useMonetaryAccountContext()
    const {payments} = useBunqPayments(data.id)
    return (
        <List>
            {payments.map(payment => {
                return <PaymentListElement payment={payment}/>
            })}
        </List>
    )
}

export default PaymentsList