import BalanceCard from "./BalanceCard.tsx";
import {Box} from "@mui/material";
import {useState} from "react";
import MonetaryAccountInfoDialog from "./MonetaryAccountInfoDialog.tsx";
import {MonetaryAccountDto} from "../../model/MonetaryAccountDto.ts";

export interface BalanceViewProps {
    monetaryAccount: MonetaryAccountDto
}

const BalanceView = ({monetaryAccount}: BalanceViewProps) => {
    const {balance} = monetaryAccount
    const [showDialog, setShowDialog] = useState(false)

    const onInfoButtonClicked = () => {
        setShowDialog(true)
    }

    const handleCloseInfoDialog = () => {
        setShowDialog(false)
    }

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center"
        }}>
            <BalanceCard balance={balance.value} onInfoClick={onInfoButtonClicked}/>

            <MonetaryAccountInfoDialog visible={showDialog} iban={monetaryAccount.alias[0].value}
                                       onClose={handleCloseInfoDialog}/>
        </Box>
    )
}

export default BalanceView