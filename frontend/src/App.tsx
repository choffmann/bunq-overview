import {QueryClient, QueryClientProvider} from "react-query";
import MonetaryAccountContainer from "./components/MonetaryAccountContainer.tsx";
import BunqView from "./components/BunqView.tsx";

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <MonetaryAccountContainer>
                <BunqView/>
            </MonetaryAccountContainer>
        </QueryClientProvider>
    )
}

export default App
