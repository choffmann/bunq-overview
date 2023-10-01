import React, {useCallback, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";


export type NavIcon = "menu" | "navigation"

export interface AppBarContextProps {
    title: string
    setTitle: (title: string) => void
    navIcon: {
        variant: NavIcon
        setVariant: (variant: NavIcon) => void
        to: (to: string) => void
        onClick: () => void
    }
    navBar: {
        isOpen: boolean
        open: () => void
        close: () => void
    }
    search: {
        visible: boolean,
        show: () => void,
        hidde: () => void
    }
    loading: {
        isLoading: boolean
        setLoading: (loading: boolean) => void
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
    const navigate = useNavigate()
    const [openNavBar, setOpenNavBar] = useState(false)
    const [showSearchIcon, setShowSearchIcon] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [navVariant, setNavVariant] = useState<NavIcon>("menu")
    const [navTo, setNavTo] = useState("")

    const handleOpenNavBar = useCallback(() => {
        setOpenNavBar(true)
    }, [])

    const handleCloseNavBar = useCallback(() => {
        setOpenNavBar(false)
    }, [])

    const handleShowSearchIcon = useCallback(() => {
        setShowSearchIcon(true)
    }, [])

    const handleHiddeSearchIcon = useCallback(() => {
        setShowSearchIcon(false)
    }, [])

    const handleSetLoading = useCallback((loading: boolean) => {
        setIsLoading(loading)
    }, [])

    const handleSetTitle = useCallback((title: string) => {
        setTitle(title)
    }, [])

    const handleSetNavVariant = useCallback((variant: NavIcon) => {
        setNavVariant(variant)
    }, [])

    const handleSetNavTo = (to: string) => {
        setNavTo(to)
    }

    const handleNavIconClick = () => {
        switch (navVariant) {
            case "menu":
                return handleOpenNavBar()
            case "navigation":
                return navigate(navTo)
        }
    }

    const context: AppBarContextProps = {
        title,
        setTitle: handleSetTitle,
        navIcon: {
            variant: navVariant,
            setVariant: handleSetNavVariant,
            to: handleSetNavTo,
            onClick: handleNavIconClick
        },
        navBar: {
            isOpen: openNavBar,
            open: handleOpenNavBar,
            close: handleCloseNavBar
        },
        search: {
            visible: showSearchIcon,
            show: handleShowSearchIcon,
            hidde: handleHiddeSearchIcon
        },
        loading: {
            isLoading,
            setLoading: handleSetLoading
        }
    }

    return (
        <AppBarContext.Provider value={context}>
            {children}
        </AppBarContext.Provider>
    )
}

export default AppBarContextProvider