import {useAppBar} from "../../context/AppBarContext.tsx";
import {useEffect} from "react";

interface SettingsAdminCenterPageProps {

}

const SettingsAdminCenterPage = ({}: SettingsAdminCenterPageProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        appBar.setTitle("Admin Center")
    }, []);

    return (
        <>
        </>
    )
}

export default SettingsAdminCenterPage