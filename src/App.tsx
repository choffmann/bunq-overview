import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./components/BunqView.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import {CssBaseline} from "@mui/material";
import NotificationContextProvider from "./context/NotificationContext.tsx";
import AppBarContextProvider from "./context/AppBarContext.tsx";
import ColorModeContextProvider from "./context/ColorModeContext.tsx";

function App() {
    return (
        <>
            <ColorModeContextProvider>
                <CssBaseline/>
                <NotificationContextProvider>
                    <AuthProvider>
                        <AppBarContextProvider>
                            <MonetaryAccountContainer>
                                <BunqView/>
                            </MonetaryAccountContainer>
                        </AppBarContextProvider>
                    </AuthProvider>
                </NotificationContextProvider>
            </ColorModeContextProvider>
        </>
    )
}

export default App
