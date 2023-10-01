import {Box, Button, CircularProgress, Paper, Stack, TextField, Typography, Container} from "@mui/material";
import {Google} from "@mui/icons-material";
import {AuthError} from "firebase/auth";
import {useState} from "react";

export interface LoginPageProps {
    submit: {
        onClick: (loginData: LoginFormData) => void
        loading: boolean
        error?: AuthError
    }
    google: {
        onClick: () => void
        loading: boolean
        error?: AuthError
    }
}

export interface LoginFormData {
    username: string
    password: string
}

const LoginPage = ({submit, google}: LoginPageProps) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
                            <Button onClick={() => submit.onClick({username, password})}
                                    variant="contained"
                                    disabled={submit.loading}
                                    startIcon={submit.loading && <CircularProgress size={20} color="inherit"/>}
                            >
                                Anmelden
                            </Button>
                            <Button onClick={() => google.onClick()}
                                    variant="outlined"
                                    disabled={google.loading}
                                    startIcon={google.loading ? <CircularProgress size={20} color="inherit"/> :
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