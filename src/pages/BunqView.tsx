import {useMonetaryAccountContext} from "../context/MonetaryAccountContext.ts";
import PaymentsList from "../components/payments/PaymentsList.tsx";
import BalanceView from "../components/balance/BalanceView.tsx";
import {useEffect, useRef, useState} from "react";
import {useAppBar} from "../context/AppBarContext.tsx";
import {Box} from "@mui/material";

const BunqView = () => {
    const appBar = useAppBar()
    const balanceRef = useRef<HTMLDivElement>()
    const {data, isFetching} = useMonetaryAccountContext()
    const [upperComponentHeight, setUpperComponentHeight] = useState(0)
    const toolBarHeight = 64
    const remainingHeight = `calc(100vh - ${upperComponentHeight}px - ${toolBarHeight}px - 30px)`;

    useEffect(() => {
        if (balanceRef.current) {
            setUpperComponentHeight(balanceRef.current.offsetHeight);
        }
    }, []);


    useEffect(() => {
        appBar.search.show()
        appBar.setTitle("Übersicht")

        return () => appBar.search.hidde()
    }, []);

    useEffect(() => {
        appBar.loading.setLoading(isFetching)
    }, [isFetching])

    return (
        <>
            {data &&
                <>
                    <Box ref={balanceRef}>
                        <Box sx={{pb: 1}}>
                            <BalanceView monetaryAccount={data}/>
                        </Box>
                    </Box>
                    <PaymentsList remainingHeight={remainingHeight}/>
                </>
            }
        </>
    )
}

export default BunqView