import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./pages/BunqView.tsx";
import {CssBaseline} from "@mui/material";
import NotificationContextProvider from "./context/NotificationContext.tsx";
import AppBarContextProvider from "./context/AppBarContext.tsx";
import ColorModeContextProvider from "./context/ColorModeContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SettingsPage from "./pages/SettingsPage.tsx";
import Layout from "./pages/Layout.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import SettingsInfoPage from "./pages/settings/SettingsInfoPage.tsx";
import SettingsOverviewPage from "./pages/settings/SettingsOverviewPage.tsx";
import SettingsProfilePage from "./pages/settings/SettingsProfilePage.tsx";
import SettingsPageLayout from "./pages/settings/SettingsPageLayout.tsx";
import SettingsAdminCenterPage from "./pages/settings/SettingsAdminCenterPage.tsx";
import {IntlProvider} from "react-intl";
import LoginPage from "./pages/LoginPage.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";

function App() {
    const client = new QueryClient()
    return (
        <>
            <ColorModeContextProvider>
                <CssBaseline/>
                <IntlProvider locale={navigator.language}>
                    <NotificationContextProvider>
                        <QueryClientProvider client={client}>
                            <BrowserRouter>
                                <AuthContextProvider>
                                    <AppBarContextProvider>
                                        <Routes>
                                            <Route path="/login">
                                                <Route index element={<LoginPage/>}/>
                                            </Route>
                                            <Route path="/" element={<Layout/>}>
                                                <Route index element={
                                                    <MonetaryAccountContainer>
                                                        <BunqView/>
                                                    </MonetaryAccountContainer>
                                                }/>
                                                <Route path="settings" element={<SettingsPage/>}/>
                                            </Route>
                                            <Route path="/settings" element={<SettingsPageLayout/>}>
                                                <Route path="info" element={<SettingsInfoPage/>}/>
                                                <Route path="admin-center" element={<SettingsAdminCenterPage/>}/>
                                                <Route path="overview" element={<SettingsOverviewPage/>}/>
                                                <Route path="profile" element={<SettingsProfilePage/>}/>
                                            </Route>
                                        </Routes>
                                        {import.meta.env.DEV && <ReactQueryDevtools/>}
                                    </AppBarContextProvider>
                                </AuthContextProvider>
                            </BrowserRouter>
                        </QueryClientProvider>
                    </NotificationContextProvider>
                </IntlProvider>
            </ColorModeContextProvider>
        </>
    )
}

export default App
