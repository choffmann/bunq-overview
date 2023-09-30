import {useAppBar} from "../context/AppBarContext.tsx";
import {useEffect} from "react";

interface SettingsPageProps {

}

const SettingsPage = ({}: SettingsPageProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        appBar.setTitle("Einstellungen")
    }, []);

    return (
        <>
            <p>Hello World</p>
        </>
    )
}

export default SettingsPage