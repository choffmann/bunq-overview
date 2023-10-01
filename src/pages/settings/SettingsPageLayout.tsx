import {useEffect} from "react";
import {useAppBar} from "../../context/AppBarContext.tsx";
import Layout from "../Layout.tsx";

interface SettingsPageLayoutProps {

}

const SettingsPageLayout = ({}: SettingsPageLayoutProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        appBar.navIcon.setVariant("navigation")
        appBar.navIcon.to("settings")
    }, []);

    return <Layout/>
}

export default SettingsPageLayout