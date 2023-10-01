import {useDeleteUser as useFirebaseDeleteUser} from "react-firebase-hooks/auth";
import {auth} from "../firebase/firebaseSetup.ts";
import {useNotify} from "../context/NotificationContext.tsx";


export function useDeleteUser() {
    const [deleteUser, _, error] = useFirebaseDeleteUser(auth)
    const notify = useNotify()

    return async () => {
        const success = await deleteUser()
        if (success) notify('Dein Account wurde erfolgreich gelöscht');
        if (error) {
            notify("Es ist ein Fehler beim löschen aufgetreten")
            console.error(error)
        }
    }
}