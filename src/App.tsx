import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./components/BunqView.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import {CssBaseline} from "@mui/material";

function App() {
    return (
        <>
            <CssBaseline/>
            <AuthProvider>
                <MonetaryAccountContainer>
                    <BunqView/>
                </MonetaryAccountContainer>
            </AuthProvider>
        </>
    )
}

export default App
