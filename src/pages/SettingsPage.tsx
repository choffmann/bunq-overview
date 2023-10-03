import {useAppBar} from "../context/AppBarContext.tsx";
import {useEffect} from "react";
import {
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
import {Link} from "react-router-dom";
import {useColorModeContext} from "../context/ColorModeContext.tsx";
import AccountInfo from "../components/account/AccountInfo.tsx";
import {useAuth} from "../context/AuthContext.tsx";

interface SettingsPageProps {

}

const SettingsPage = ({}: SettingsPageProps) => {
    const appBar = useAppBar()
    const {colorMode, toggleColorMode} = useColorModeContext()
    const {user} = useAuth()
    const isAdmin = import.meta.env.DEV || user?.uid === "8dUHVOe2i4gWaLz0tUXlzS7wsxx2"

    useEffect(() => {
        appBar.setTitle("Einstellungen")
    }, []);

    return (
        <>
            <AccountInfo/>
            <List>
                <ListItem>
                    <ListItemIcon><DarkMode/></ListItemIcon>
                    <ListItemText primary="Dark Mode"/>
                    <Switch checked={colorMode === "dark"} onChange={() => toggleColorMode()}/>
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