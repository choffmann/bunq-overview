import {Box, Button, CircularProgress, Paper, Stack, TextField, Typography, Container} from "@mui/material";
import {Google} from "@mui/icons-material";
import {useState} from "react";
import {useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth} from "../firebase/firebaseSetup.ts";
import {useNotify} from "../context/NotificationContext.tsx";
import {useNavigate} from "react-router-dom";

export interface LoginPageProps {

}

const LoginPage = ({}: LoginPageProps) => {
    const notify = useNotify()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signInWithGoogle, _g, googleLoading] = useSignInWithGoogle(auth);
    const [signInWithEmail, _e, emailLoading] = useSignInWithEmailAndPassword(auth)

    const onSubmit = () => {
        signInWithEmail(username, password)
            .then(res => {
                if (res) {
                    sessionStorage.setItem("auth", JSON.stringify(res))
                    navigate("/")
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    const onGoogleSubmit = () => {
        signInWithGoogle()
            .then(res => {
                if (res) {
                    navigate("/")
                }
            })
            .catch(err => {
                notify("Es ist ein Fehler beim der Anmeldung aufgetreten")
                console.error(err)
            })
    }

    return (
        <Container>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}>
                <Paper sx={{p: 3}} elevation={3}>
                    <Box sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <img src="/assets/icons/logo-96.png" alt="BUNQ Logo" height="96" width="96"
                             style={{paddingBottom: 16}}/>
                        <Stack spacing={2}>
                            <Typography variant="h4" textAlign="center">Wie gehts BUNQ?</Typography>
                            <TextField variant="outlined" label="Username" value={username}
                                       onChange={(event) => setUsername(event.target.value)}/>
                            <TextField variant="outlined" label="Passwort" type="password" value={password}
                                       onChange={(event) => setPassword(event.target.value)}/>
                            <Button onClick={() => onSubmit()}
                                    variant="contained"
                                    disabled={emailLoading}
                                    startIcon={emailLoading && <CircularProgress size={20} color="inherit"/>}
                            >
                                Anmelden
                            </Button>
                            <Button onClick={() => onGoogleSubmit()}
                                    variant="outlined"
                                    disabled={googleLoading}
                                    startIcon={googleLoading ? <CircularProgress size={20} color="inherit"/> :
                                        <Google/>}
                            >
                                Mit Google anmelden
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage