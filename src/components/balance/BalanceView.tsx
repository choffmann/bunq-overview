import BalanceCard from "./BalanceCard.tsx";
import {Box} from "@mui/material";
import {useState} from "react";
import MonetaryAccountInfoDialog from "./MonetaryAccountInfoDialog.tsx";
import MonetaryAccountBank from "../../model/MonetaryAccountDto.ts";

export interface BalanceViewProps {
    monetaryAccount?: MonetaryAccountBank
}

const BalanceView = ({monetaryAccount}: BalanceViewProps) => {
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
            justifyContent: "center",
            mt: 2
        }}>
            <BalanceCard balance={monetaryAccount?.balance.value} onInfoClick={onInfoButtonClicked}/>

            <MonetaryAccountInfoDialog visible={showDialog} iban={monetaryAccount?.alias.find(value => value.type === "IBAN")?.value || "Keine IBAN vorhanden"}
                                       onClose={handleCloseInfoDialog}/>
        </Box>
    )
}

export default BalanceView