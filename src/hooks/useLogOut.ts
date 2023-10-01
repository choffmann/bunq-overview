import {auth} from "../firebase/firebaseSetup.ts";
import {useSignOut} from "react-firebase-hooks/auth";
import {useNotify} from "../context/NotificationContext.tsx";

export function useLogOut() {
    const [signOut, _, error] = useSignOut(auth);
    const notify = useNotify()

    return async () => {
        const success = await signOut()
        if (success) notify('Du wurdest erfolgreich abgemeldet');
        if (error) {
            notify("Es ist ein Fehler beim abmelden aufgetreten")
            console.error(error)
        }
    }
}