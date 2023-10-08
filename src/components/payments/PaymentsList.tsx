import {
    Avatar, Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, ListSubheader,
    Skeleton,
    Typography
} from "@mui/material";
import {useBunqPayments} from "../../hooks/useBunqPayments.ts";
import PaymentListElement from "./PaymentListElement.tsx";
import {useMonetaryAccountContext} from "../../context/MonetaryAccountContext.ts";
import {useAppBar} from "../../context/AppBarContext.tsx";
import {useEffect} from "react";
import {FormattedRelativeTime} from "react-intl";

export interface PaymentsListProps {
    remainingHeight: string
}

const PaymentsList = ({remainingHeight}: PaymentsListProps) => {
    const appBar = useAppBar()
    const {data} = useMonetaryAccountContext()
    const {payments, isLoading} = useBunqPayments(data.id)

    useEffect(() => {
        appBar.loading.setLoading(isLoading)
    }, [isLoading]);


    const EmptyList = () =>
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
        <Box sx={{}}>
            <List
                subheader={<li/>}
                sx={{
                    height: remainingHeight,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': {padding: 0},
                    '&::-webkit-scrollbar': {display: "none"}
                }}>
                {isLoading && loading()}
                {payments && payments.length <= 0 && <EmptyList/>}
                {payments && payments.map(({week, payments, amount}) => {
                    return (
                        <li>
                            <ul>
                                {week === 0 ?
                                    <ListSubheader>
                                        <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                            <span>Diese Woche</span>
                                            <span>Gesamt: {amount} €</span>
                                        </Box>
                                    </ListSubheader>
                                    : <ListSubheader>
                                        <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                                            <span><FormattedRelativeTime value={week * -1} unit="week"/></span>
                                            <span>Gesamt: {amount} €</span>
                                        </Box>
                                    </ListSubheader>
                                }

                                {payments.map(payment => <PaymentListElement payment={payment}/>)}
                            </ul>
                        </li>
                    )
                })}
            </List>
        </Box>
    )
}

export default PaymentsList