import {Avatar, Stack, Typography} from "@mui/material";
import {useAuthContext} from "../../context/AuthContext.ts";

interface AccountInfoProps {

}

const AccountInfo = ({}: AccountInfoProps) => {
    const user = useAuthContext()

    return (
        <Stack justifyContent="center" alignItems="center" sx={{my: 2}}>
            <Avatar sx={{width: 96, height: 96}} src={user.photoURL ?? undefined}/>
            <Typography variant="h5" sx={{pt: 1}}>{user.displayName}</Typography>
            <Typography variant="subtitle1">{user.email}</Typography>
        </Stack>
    )
}

export default AccountInfo