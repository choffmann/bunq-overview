import {Box, IconButton, Typography} from "@mui/material";
import {InfoRounded} from "@mui/icons-material";

export interface BalanceViewProps {
    balance: string
    onInfoClick: () => void
}

const BalanceCard = ({balance, onInfoClick}: BalanceViewProps) => {
    return (
        <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            width: 300,
            position: "relative"
        }}>
            <IconButton
                onClick={() => onInfoClick()}
                sx={{
                    position: "absolute",
                    top: 5,
                    right: 5
                }}>
                <InfoRounded color="primary"/>
            </IconButton>
            <Typography color='text.secondary'>Saldo</Typography>
            <Typography fontSize={34} fontWeight="medium" color="text.primary">{balance} €</Typography>


        </Box>
    )
}

export default BalanceCard