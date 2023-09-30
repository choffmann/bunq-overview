import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./pages/BunqView.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import {CssBaseline} from "@mui/material";
import NotificationContextProvider from "./context/NotificationContext.tsx";
import AppBarContextProvider from "./context/AppBarContext.tsx";
import ColorModeContextProvider from "./context/ColorModeContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SettingsPage from "./pages/SettingsPage.tsx";
import Layout from "./pages/Layout.tsx";

function App() {
    return (
        <>
            <ColorModeContextProvider>
                <CssBaseline/>
                <NotificationContextProvider>
                    <AuthProvider>
                        <AppBarContextProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<Layout />}>
                                        <Route index element={
                                            <MonetaryAccountContainer>
                                                <BunqView/>
                                            </MonetaryAccountContainer>
                                        }/>
                                        <Route path="settings" element={<SettingsPage/>}/>
                                    </Route>
                                </Routes>
                            </BrowserRouter>

                        </AppBarContextProvider>
                    </AuthProvider>
                </NotificationContextProvider>
            </ColorModeContextProvider>
        </>
    )
}

export default App
