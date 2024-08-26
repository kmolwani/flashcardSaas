import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function SignUpPage(){
    return (
        <Container maxwidth="100vw">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{
                        flexGrow: 1
                    }}>
                        FlashCard SaaS
                    </Typography>
                    <Button color="inherit" href='/sign-in'>
                        Login    
                    </Button>
                    <Button color="inherit" href='/sign-up'>
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography variant="h4" gutterBottom>Sign In</Typography>
                <SignIn/>
            </Box>
        </Container>
    )
}