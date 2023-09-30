import React, {useContext, useState} from "react";
import {Slide, Snackbar} from "@mui/material";

export interface NotificationContextProps {
    message: string
    open: boolean
    notify: (message: string) => void
}

const NotificationContext = React.createContext<NotificationContextProps | null>(null)

export interface NotificationContextProviderProps {
    children?: React.ReactElement
}

const NotificationContextProvider = ({children}: NotificationContextProviderProps) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const notify = (value: string) => {
        setMessage(value)
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    const context: NotificationContextProps = {
        message,
        open,
        notify
    }

    return (
        <NotificationContext.Provider value={context}>
            <Snackbar open={open} onClose={() => onClose()} message={message}
                      anchorOrigin={{horizontal: "center", vertical: "bottom"}} TransitionComponent={Slide}
                      autoHideDuration={6000}/>
            {children}
        </NotificationContext.Provider>

    )
}

export function useNotificationContext() {
    const context = useContext(NotificationContext)
    if (context === null) {
        throw Error("Did you create NotificationContext.Provider?")
    }
    return context
}

export function useNotify() {
    const context = useNotificationContext()

    return (message: string) => {
        context.notify(message)
    }
}

export default NotificationContextProvider