import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./components/BunqView.tsx";
import AuthProvider from "./components/AuthProvider.tsx";

function App() {
    return (
        <AuthProvider>
            <MonetaryAccountContainer>
                <BunqView/>
            </MonetaryAccountContainer>
        </AuthProvider>
    )
}

export default App
