import {QueryClient, QueryClientProvider} from "react-query";
import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./components/BunqView.tsx";
import AuthWrapper from "./components/AuthWrapper.tsx";

function App() {
    const queryClient = new QueryClient()
    return (
        <AuthWrapper>
            <QueryClientProvider client={queryClient}>
                <MonetaryAccountContainer>
                    <BunqView/>
                </MonetaryAccountContainer>
            </QueryClientProvider>
        </AuthWrapper>
    )
}

export default App
