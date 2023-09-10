import {Payment} from "../../../model-api-client/bunq/PaymentDto.ts";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";

export interface PaymentListElementProps {
    payment: Payment
}

const PaymentListElement = ({payment}: PaymentListElementProps) => {

    const handleAvatar = () => {
        const image = payment.counterparty_alias.avatar?.image
        if (image != undefined) {
            return <Avatar alt="counterparty avatar"
                           src={`http://localhost:8080/api/attachment/${image[0].attachment_public_uuid}`}/>
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