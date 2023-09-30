import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {createTheme, ThemeProvider, useMediaQuery} from "@mui/material";

export type ColorMode = "light" | "dark"

export interface ColorModeContextProps {
    colorMode: ColorMode
    toggleColorMode: () => void
}

const ColorModeContext = React.createContext<ColorModeContextProps | null>(null)

const ColorModeContextProvider = ({children}: React.PropsWithChildren) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [mode, setMode] = useState<ColorMode>(prefersDarkMode ? "dark" : "light")
    const theme = useMemo(() => {
        localStorage.setItem('colorMode', mode)
        return createTheme({palette: {mode}})
    }, [mode])

    useEffect(() => {
        setMode(prefersDarkMode ? "dark" : "light")
    }, [prefersDarkMode])

    const toggleColorMode = useCallback(() => {
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