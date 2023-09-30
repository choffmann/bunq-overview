import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography
} from "@mui/material";
import {useBunqPayments} from "../../hooks/useBunqPayments.ts";
import PaymentListElement from "./PaymentListElement.tsx";
import {useMonetaryAccountContext} from "../../context/MonetaryAccountContext.ts";
import {useAppBar} from "../../context/AppBarContext.tsx";
import {useEffect} from "react";

const PaymentsList = () => {
    const appBar = useAppBar()
    const {data} = useMonetaryAccountContext()
    const {payments, executing} = useBunqPayments(data.id)

    useEffect(() => {
        appBar.loading.setLoading(executing)
    }, [executing]);

    const emptyList =
        <ListItem>
            <Typography color="text.secondary">Es sind keine Einträge verfügbar</Typography>
        </ListItem>

    const loading = () => Array.from(Array(30)).map((i) =>
        <ListItem key={i}>
            <ListItemAvatar>
                <Skeleton variant="circular">
                    <Avatar/>
                </Skeleton>
            </ListItemAvatar>
            <ListItemText primary={<Skeleton/>} secondary={<Skeleton width="60%"/>}/>
        </ListItem>
    )

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