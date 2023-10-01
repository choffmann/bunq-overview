import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {Payment} from "../../model/Payment.ts";
import {FormattedRelativeTime} from "react-intl";

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

    const calculateWeeksDiff = () => {
        const today = new Date()
        const paymentDate = new Date(payment.created)
        return Math.floor((today.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24 * 7))
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
            <ListItemText
                primaryTypographyProps={{style: {whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}, pr: 4}}
                primary={payment.counterparty_alias.display_name}
                secondary={<FormattedRelativeTime value={calculateWeeksDiff() * -1} unit="week"/>}/>
        </ListItem>
    )
}

export default PaymentListElement