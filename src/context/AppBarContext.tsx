import React, {useContext, useState} from "react";

export interface AppBarContextProps {
    navBar: {
        isOpen: boolean
        open: () => void
        close: () => void
    }
}

const AppBarContext = React.createContext<AppBarContextProps | null>(null)

export function useAppBar() {
    const context = useContext(AppBarContext)
    if (context === null) {
        throw Error("Did you create AppBarContext.Provider?")
    }
    return context
}

export interface AppBarContextProviderProps extends React.PropsWithChildren {

}

const AppBarContextProvider = ({children}: AppBarContextProviderProps) => {
    const [openNavBar, setOpenNavBar] = useState(false)

    const handleOpenNavBar = () => {
        setOpenNavBar(true)
    }

    const handleCloseNavBar = () => {
        setOpenNavBar(false)
    }

    const context: AppBarContextProps = {
        navBar: {
            isOpen: openNavBar,
            open: handleOpenNavBar,
            close: handleCloseNavBar
        }
    }

    return (
        <AppBarContext.Provider value={context}>
            {children}
        </AppBarContext.Provider>
    )
}

export default AppBarContextProvider