import {useAppBar} from "../context/AppBarContext.tsx";
import {useEffect} from "react";
import {
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Stack,
    Switch,
    Typography,
    Link as MuiLink
} from "@mui/material";
import {
    AccountCircle,
    Build,
    DarkMode,
    Info,
    KeyboardArrowRight,
    SupervisedUserCircle
} from "@mui/icons-material";
import {useAuthContext} from "../context/AuthContext.ts";
import {Link} from "react-router-dom";

interface SettingsPageProps {

}

const SettingsPage = ({}: SettingsPageProps) => {
    const appBar = useAppBar()
    const user = useAuthContext()
    const isAdmin = import.meta.env.DEV || user.uid === "8dUHVOe2i4gWaLz0tUXlzS7wsxx2"

    useEffect(() => {
        appBar.setTitle("Einstellungen")
    }, []);

    return (
        <>
            <Stack justifyContent="center" alignItems="center" sx={{my: 2}}>
                <Avatar sx={{width: 96, height: 96}} src={user.photoURL ?? undefined}/>
                <Typography variant="h5">{user.displayName}</Typography>
                <Typography variant="subtitle1">{user.email}</Typography>
            </Stack>
            <List>
                <ListItem>
                    <ListItemIcon><DarkMode/></ListItemIcon>
                    <ListItemText primary="Dark Mode"/>
                    <Switch/>
                </ListItem>
                <ListItemButton component={Link} to="/settings/overview">
                    <ListItemIcon><Build/></ListItemIcon>
                    <ListItemText>Übersicht</ListItemText>
                    <KeyboardArrowRight color="inherit"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/settings/profile">
                    <ListItemIcon><AccountCircle/></ListItemIcon>
                    <ListItemText>Profil</ListItemText>
                    <KeyboardArrowRight color="inherit"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/settings/info">
                    <ListItemIcon><Info/></ListItemIcon>
                    <ListItemText>Info</ListItemText>
                    <KeyboardArrowRight color="inherit"/>
                </ListItemButton>
                {isAdmin &&
                    <ListItemButton component={Link} to="/settings/admin-center">
                        <ListItemIcon><SupervisedUserCircle/></ListItemIcon>
                        <ListItemText>Admin Center</ListItemText>
                        <KeyboardArrowRight color="inherit"/>
                    </ListItemButton>
                }
            </List>
            <Stack justifyContent="center" alignItems="center">
                <Typography variant="caption">{import.meta.env.VITE_APP_VERSION} ({import.meta.env.VITE_LAST_COMMIT})</Typography>
                <MuiLink href="https://github.com/choffmann/bunq-overview" target="_blank" rel="noopener">
                    <Typography variant="caption">https://github.com/choffmann/bunq-overview</Typography>
                </MuiLink>
            </Stack>
        </>
    )
}

export default SettingsPage