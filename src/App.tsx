import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./components/BunqView.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import {CssBaseline} from "@mui/material";
import NotificationContextProvider from "./context/NotificationContext.tsx";

function App() {
    return (
        <>
            <CssBaseline/>
            <NotificationContextProvider>
                <AuthProvider>
                    <MonetaryAccountContainer>
                        <BunqView/>
                    </MonetaryAccountContainer>
                </AuthProvider>
            </NotificationContextProvider>
        </>
    )
}

export default App
