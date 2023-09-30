import {
    Avatar,
    Collapse,
    Divider,
    List, ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer
} from "@mui/material";
import React, {useState} from "react";
import {BugReport, ExpandLess, ExpandMore, Logout, Message, Monitor, Settings} from "@mui/icons-material";
import {useSignOut} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/firebaseSetup.ts";
import {useNotify} from "../../context/NotificationContext.tsx";
import {useAppBar} from "../../context/AppBarContext.tsx";
import {useAuthContext} from "../../context/AuthContext.ts";

export interface AppDrawerProps {
    children?: React.ReactElement
}

const AppDrawer = ({children}: AppDrawerProps) => {
    const notify = useNotify()
    const appBar = useAppBar()
    const user = useAuthContext()
    const [signOut, _, error] = useSignOut(auth);
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDebugList, setOpenDebugList] = useState(false)

    const debugList = <>
        <Divider/>
        <ListItemButton onClick={() => handleDebugList()}>
            <ListItemIcon><BugReport/></ListItemIcon>
            <ListItemText>Debug List</ListItemText>
            {openDebugList ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={openDebugList}>
            <List>
                <ListItemButton onClick={() => handleTriggerSnackBar()} sx={{ pl: 4 }}>
                    <ListItemIcon><Message/></ListItemIcon>
                    <ListItemText>Trigger Snackbar</ListItemText>
                </ListItemButton>
            </List>
        </Collapse>
    </>

    const handleLogOut = async () => {
        const success = await signOut()
        if (success) notify('Du wurdest erfolgreich abgemeldet');
        if (error) {
            notify("Es ist ein Fehler beim abmelden aufgetreten")
            console.error(error)
        }
    }

    const handleDebugList = () => {
        setOpenDebugList(value => !value)
    }

    const handleTriggerSnackBar = () => {
        const messages = ["Eine Testnachricht von der Debug List", "Noch eine Nachricht zum testen", "Foo Bar!! Hello World"]
        notify(messages[(Math.floor(Math.random() * messages.length))])
    }

    return (
        <>
            <SwipeableDrawer anchor="left" open={appBar.navBar.isOpen} onClose={() => appBar.navBar.close()}
                             onOpen={() => appBar.navBar.open()} disableBackdropTransition={!iOS}
                             disableDiscovery={iOS}>
                <List>
                    <ListItemButton>
                        <ListItemAvatar><Avatar src={user.photoURL ?? undefined}/></ListItemAvatar>
                        <ListItemText primary={user.displayName} secondary={user.email}/>
                    </ListItemButton>
                    <Divider/>
                    <ListItemButton>
                        <ListItemIcon><Settings/></ListItemIcon>
                        <ListItemText>Einstellungen</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><Monitor/></ListItemIcon>
                        <ListItemText>Systeminformationen</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleLogOut()}>
                        <ListItemIcon><Logout/></ListItemIcon>
                        <ListItemText>Abmelden</ListItemText>
                    </ListItemButton>
                    {import.meta.env.DEV && debugList}
                </List>
            </SwipeableDrawer>
            {children}
        </>
    )
}

export default AppDrawer