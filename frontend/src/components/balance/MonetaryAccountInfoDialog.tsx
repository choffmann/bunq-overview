import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

export interface MonetaryAccountInfoDialogProps {
    visible: boolean,
    iban: string,
    bic: string,
    onClose: () => void
}

const MonetaryAccountInfoDialog = ({visible, iban, bic, onClose}: MonetaryAccountInfoDialogProps) => {
    return (
        <Dialog open={visible} maxWidth="sm" onClick={() => onClose()}>
            <DialogTitle>
                <Typography fontWeight="bold">Kontoinformationen</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>IBAN: {iban}</Typography>
                <Typography>BIC: {bic}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Schließen</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MonetaryAccountInfoDialog