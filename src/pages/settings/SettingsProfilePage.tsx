import {useAppBar} from "../../context/AppBarContext.tsx";
import {useEffect, useState} from "react";
import AccountInfo from "../../components/account/AccountInfo.tsx";
import {
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {DeleteForever, Logout} from "@mui/icons-material";
import {useLogOut} from "../../hooks/useLogOut.ts";
import {useDeleteUser} from "../../hooks/useDeleteUser.ts";
import {useNavigate} from "react-router-dom";

interface SettingsProfilePageProps {

}

interface DeleteUserDialogProps {
    open: boolean
    onCancel: () => void
    onSubmit: () => void
}

const DeleteUserDialog = ({open, onSubmit, onCancel}: DeleteUserDialogProps) => {

    return (
        <Dialog open={open} onClose={() => onCancel()}>
            <DialogTitle>Account löschen</DialogTitle>
            <DialogContent>Möchtest du dein Account wirklich löschen?</DialogContent>
            <DialogActions>
                <Button onClick={() => onCancel()}>Abbrechen</Button>
                <Button onClick={() => onSubmit()} variant="contained" startIcon={<DeleteForever/>} color="error">Löschen</Button>
            </DialogActions>
        </Dialog>
    )
}

const SettingsProfilePage = ({}: SettingsProfilePageProps) => {
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)
    const deleteUser = useDeleteUser();
    const appBar = useAppBar()
    const logout = useLogOut();

    useEffect(() => {
        appBar.setTitle("Profil")
    }, []);

    const handleDeleteUser = async () => {
        setOpenDialog(false)
        await deleteUser()
        navigate("/login")
    }

    return (
        <>
            <AccountInfo/>
            <List>
                <ListItemButton onClick={() => logout()}>
                    <ListItemIcon><Logout/></ListItemIcon>
                    <ListItemText primary="Abmelden"/>
                </ListItemButton>
                <ListItemButton onClick={() => setOpenDialog(true)}>
                    <ListItemIcon><DeleteForever/></ListItemIcon>
                    <ListItemText primary="Account löschen"/>
                </ListItemButton>
            </List>
            <DeleteUserDialog open={openDialog} onCancel={() => setOpenDialog(false)} onSubmit={() => handleDeleteUser()}/>
        </>
    )
}

export default SettingsProfilePage