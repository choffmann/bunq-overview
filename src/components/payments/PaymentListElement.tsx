import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {Payment} from "../../model/Payment.ts";

export interface PaymentListElementProps {
    payment: Payment
}

const PaymentListElement = ({payment}: PaymentListElementProps) => {

    const handleAvatar = () => {
        const image = payment.counterparty_alias.avatar?.image
        if (image != undefined) {
            return <Avatar src={`${image[0].urls[0].url}`}/>
        } else {
            return <Avatar/>
        }
    }

    return (
        <ListItem
            key={payment.id}
            secondaryAction={
                <Typography fontWeight="bold">{payment.amount.value} €</Typography>
            }>
            <ListItemAvatar>
                {handleAvatar()}
            </ListItemAvatar>
            <ListItemText primary={
                <Typography noWrap>{payment.counterparty_alias.display_name}</Typography>
            }/>
        </ListItem>
    )
}

export default PaymentListElement