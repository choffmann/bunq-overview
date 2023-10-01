import {List, ListItem, ListItemText, ListSubheader, Typography} from "@mui/material";
import {useAppBar} from "../../context/AppBarContext.tsx";
import {useEffect} from "react";

interface SettingsInfoPageProps {

}

const SettingsInfoPage = ({}: SettingsInfoPageProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        appBar.setTitle("Info")
    }, []);

    return (
        <>
            <List subheader={<ListSubheader sx={{}}>App Info</ListSubheader>}>
                <ListItem>
                    <ListItemText>App Name</ListItemText>
                    <Typography>{import.meta.env.VITE_APP_NAME}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText>App Icon</ListItemText>
                    <img src="/assets/icons/logo_square-96.png" height={24} width={24} alt="app logo"/>
                </ListItem>
            </List>
            <List subheader={<ListSubheader>Build Info</ListSubheader>}>
                <ListItem>
                    <ListItemText>Version Nr.</ListItemText>
                    <Typography>{import.meta.env.VITE_APP_VERSION}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText>Commit Nr.</ListItemText>
                    <Typography>{import.meta.env.VITE_LAST_COMMIT}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText>Branch Name</ListItemText>
                    <Typography>{import.meta.env.VITE_CURRENT_BRANCH}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText>Build Datum</ListItemText>
                    <Typography>{import.meta.env.VITE_APP_BUILD_DATETIME}</Typography>
                </ListItem>
            </List>
        </>
    )
}

export default SettingsInfoPage