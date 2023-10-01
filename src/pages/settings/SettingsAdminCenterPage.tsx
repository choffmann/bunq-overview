import {useAppBar} from "../../context/AppBarContext.tsx";
import {useEffect} from "react";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Refresh} from "@mui/icons-material";
import { doc, deleteDoc } from "firebase/firestore";
import {db} from "../../firebase/firebaseSetup.ts";
import {useNotify} from "../../context/NotificationContext.tsx";

interface SettingsAdminCenterPageProps {

}

const SettingsAdminCenterPage = ({}: SettingsAdminCenterPageProps) => {
    const appBar = useAppBar()
    const notify = useNotify()

    useEffect(() => {
        appBar.setTitle("Admin Center")
    }, []);

    const handleDeleteTokens = async () => {
        return deleteDoc(doc(db, 'bunq.config', 'tokens'))
            .then(() => deleteDoc(doc(db, 'bunq.config', 'session')))
            .then(() => notify("Tokens wurden erfolgreich zurücksetzten"))
            .catch(error => {
                notify("Es ist ein Fehler beim zurücksetzten der Tokens aufgetreten")
                console.error(error)
            })
    }

    const handleDeleteSession = async () => {
        return deleteDoc(doc(db, 'bunq.config', 'session'))
            .then(() => notify("Session wurden erfolgreich zurücksetzten"))
            .catch(error => {
                notify("Es ist ein Fehler beim zurücksetzten der Session aufgetreten")
                console.error(error)
            })
    }

    return (
        <>
            <List>
                <ListItemButton onClick={() => handleDeleteTokens()}>
                    <ListItemIcon><Refresh/></ListItemIcon>
                    <ListItemText primary="Tokens zurücksetzten"/>
                </ListItemButton>
                <ListItemButton onClick={() => handleDeleteSession()}>
                    <ListItemIcon><Refresh/></ListItemIcon>
                    <ListItemText primary="Session zurücksetzten"/>
                </ListItemButton>
            </List>
        </>
    )
}

export default SettingsAdminCenterPage