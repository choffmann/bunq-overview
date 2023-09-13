import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer
} from "@mui/material";
import React, {useState} from "react";
import {Logout, Monitor} from "@mui/icons-material";
import {useSignOut} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/firebaseSetup.ts";

export interface AppDrawerProps {
    children?: React.ReactElement
}

const AppDrawer = ({children}: AppDrawerProps) => {
    const [signOut, loading, error] = useSignOut(auth);
    const [openDrawer, setOpenDrawer] = useState(false)
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handleLogOut = async () => {
        const success = await signOut()
        if (success) alert('You are sign out');
    }

    return (
        <>
            <SwipeableDrawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}
                             onOpen={() => setOpenDrawer(true)} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
                <List>
                    <ListItemButton>
                        <ListItemIcon><Monitor/></ListItemIcon>
                        <ListItemText>Systeminformationen</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleLogOut()}>
                        <ListItemIcon><Logout/></ListItemIcon>
                        <ListItemText>Abmelden</ListItemText>
                    </ListItemButton>
                </List>
            </SwipeableDrawer>
            {children}
        </>
    )
}

export default AppDrawer