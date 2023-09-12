import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

export interface MonetaryAccountInfoDialogProps {
    visible: boolean,
    iban: string,
    onClose: () => void
}

const BUNQ_BIC = "BUNQDE82XXX"

const MonetaryAccountInfoDialog = ({visible, iban, onClose}: MonetaryAccountInfoDialogProps) => {
    return (
        <Dialog open={visible} maxWidth="md" onClick={() => onClose()}>
            <DialogTitle>
                <Typography fontWeight="bold">Kontoinformationen</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>IBAN: {iban}</Typography>
                <Typography>BIC: {BUNQ_BIC}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Schließen</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MonetaryAccountInfoDialog