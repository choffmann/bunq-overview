import TopAppBar from "../components/appbar/TopAppBar.tsx";
import AppDrawer from "../components/appbar/AppDrawer.tsx";
import {Outlet} from "react-router-dom";
import {useAppBar} from "../context/AppBarContext.tsx";
import {useEffect} from "react";

interface LayoutProps {
}

const Layout = ({}: LayoutProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        appBar.navIcon.setVariant("menu")
    }, []);

    return (
        <>
            <TopAppBar/>
            <AppDrawer>
                <Outlet/>
            </AppDrawer>
        </>
    )
}

export default Layout