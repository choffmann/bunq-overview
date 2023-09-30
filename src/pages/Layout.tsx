import TopAppBar from "../components/appbar/TopAppBar.tsx";
import AppDrawer from "../components/appbar/AppDrawer.tsx";
import {Outlet} from "react-router-dom";

interface LayoutProps {
}

const Layout = ({}: LayoutProps) => {
    return (
        <>
            <TopAppBar/>
            <AppDrawer/>
            <Outlet/>
        </>
    )
}

export default Layout