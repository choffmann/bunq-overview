import {useAppBar} from "../../context/AppBarContext.tsx";
import {useEffect} from "react";

interface SettingsOverviewPageProps {

}

const SettingsOverviewPage = ({}: SettingsOverviewPageProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        appBar.setTitle("Übersicht")
    }, []);

    return (
        <>
        </>
    )
}

export default SettingsOverviewPage