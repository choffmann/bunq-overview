import {
    Avatar,
    Collapse,
    Divider,
    List, ListItem, ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer, Switch
} from "@mui/material";
import React, {useState} from "react";
import {BugReport, DarkMode, ExpandLess, ExpandMore, Logout, Message, Settings} from "@mui/icons-material";
import {useSignOut} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/firebaseSetup.ts";
import {useNotify} from "../../context/NotificationContext.tsx";
import {useAppBar} from "../../context/AppBarContext.tsx";
import {useAuthContext} from "../../context/AuthContext.ts";
import {useColorModeContext} from "../../context/ColorModeContext.tsx";

export interface AppDrawerProps {
    children?: React.ReactElement
}

const AppDrawer = ({children}: AppDrawerProps) => {
    const notify = useNotify()
    const appBar = useAppBar()
    const user = useAuthContext()
    const {colorMode, toggleColorMode} = useColorModeContext()
    const [signOut, _, error] = useSignOut(auth);
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDebugList, setOpenDebugList] = useState(false)

    const debugList = <>
        <ListItemButton onClick={() => handleDebugList()}>
            <ListItemIcon><BugReport/></ListItemIcon>
            <ListItemText>Debug List</ListItemText>
            {openDebugList ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={openDebugList}>
            <List>
                <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon><DarkMode/></ListItemIcon>
                    <ListItemText>Dark Mode</ListItemText>
                    <Switch value={colorMode === "dark"} onChange={() => handleSwitchColorMode()}/>
                </ListItem>
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

    const handleSwitchColorMode = () => {
        toggleColorMode()
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