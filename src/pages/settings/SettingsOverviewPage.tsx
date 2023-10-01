import {useAppBar} from "../../context/AppBarContext.tsx";
import {useEffect} from "react";
import {Typography} from "@mui/material";

interface SettingsOverviewPageProps {

}

const SettingsOverviewPage = ({}: SettingsOverviewPageProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        appBar.setTitle("Übersicht")
    }, []);

    return (
        <>
            <Typography>Hier werden Einstellungen für die Übersicht zu sehen sein...</Typography>
        </>
    )
}

export default SettingsOverviewPage