import React, {useCallback, useContext, useMemo, useState} from "react";
import {createTheme, ThemeProvider, useMediaQuery} from "@mui/material";

export type ColorMode = "light" | "dark"

export interface ColorModeContextProps {
    colorMode: ColorMode
    toggleColorMode: () => void
}

const ColorModeContext = React.createContext<ColorModeContextProps | null>(null)

const ColorModeContextProvider = ({children}: React.PropsWithChildren) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const initColorMode = useCallback(() => {
        const localStorageColorMode = localStorage.getItem("colorMode")
        if (localStorageColorMode === null) return prefersDarkMode ? "dark" : "light"
        else return localStorageColorMode === "dark" ? "dark" : "light"
    }, [])
    const [mode, setMode] = useState<ColorMode>(initColorMode())
    const theme = useMemo(() => {
        return createTheme({palette: {mode}})
    }, [mode])

    const toggleColorMode = useCallback(() => {
        localStorage.setItem('colorMode', mode === "light" ? "dark" : "light")
        setMode(prevMode => prevMode === "light" ? "dark" : "light")
    }, [])

    const context: ColorModeContextProps = {
        colorMode: mode,
        toggleColorMode
    }

    return (
        <ColorModeContext.Provider value={context}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export function useColorModeContext() {
    const context = useContext(ColorModeContext)
    if (context === null) {
        throw Error("Did you create ColorModeContext.Provider?")
    }
    return context
}

export default ColorModeContextProvider