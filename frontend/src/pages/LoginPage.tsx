import {Box, Button, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";

export interface LoginPageProps {
    onSubmit: (loginData: LoginFormData) => void
}

export interface LoginFormData {
    username: string
    password: string
}

const LoginPage = ({onSubmit}: LoginPageProps) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Container>
            <Paper sx={{p: 3}}>
                <Box sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <img src="/assets/icons/logo_square-512.png" alt="BUNQ Logo" height="96" width="96" style={{paddingBottom: 16}}/>
                    <Stack spacing={2}>
                        <Typography variant="h4" textAlign="center">Wie gehts BUNQ?</Typography>
                        <TextField variant="outlined" label="Username" value={username}
                                   onChange={(event) => setUsername(event.target.value)}/>
                        <TextField variant="outlined" label="Passwort" type="password" value={password}
                                   onChange={(event) => setPassword(event.target.value)}/>
                        <Button onClick={() => onSubmit({username, password})} variant="contained">Anmelden</Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage