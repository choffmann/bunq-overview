import TopAppBar from "../components/appbar/TopAppBar.tsx";
import AppDrawer from "../components/appbar/AppDrawer.tsx";
import {Outlet} from "react-router-dom";
import {useAppBar} from "../context/AppBarContext.tsx";
import {useEffect} from "react";
import PrivateRoute from "./routes/PrivateRoute.tsx";

interface LayoutProps {
}

const Layout = ({}: LayoutProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        appBar.navIcon.setVariant("menu")
    }, []);

    return (
        <PrivateRoute>
            <>
                <TopAppBar/>
                <AppDrawer>
                    <Outlet/>
                </AppDrawer>
            </>
        </PrivateRoute>
    )
}

export default Layout