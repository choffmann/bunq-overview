import {QueryClient, QueryClientProvider} from "react-query";
import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./components/BunqView.tsx";
import AuthProvider from "./components/AuthProvider.tsx";

function App() {
    const queryClient = new QueryClient()
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <MonetaryAccountContainer>
                    <BunqView/>
                </MonetaryAccountContainer>
            </QueryClientProvider>
        </AuthProvider>
    )
}

export default App
