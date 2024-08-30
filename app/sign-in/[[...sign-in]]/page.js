import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function SignUpPage(){
    return (
        <Container maxwidth="100vw">
            <AppBar position="fixed" sx={{width: '100vw', pl: '0px', pr: '0px', zIndex: '9999', backgroundColor: 'rgba(0,0,0,0.85)', boxShadow: '10'}}>
                <Toolbar>
                    <Typography variant="h6" sx={{
                        flexGrow: 1
                    }}>
                        CardsAI
                    </Typography>
                    <Button color="inherit" href="/" sx={{mr:2, backgroundColor: 'grey'}}>Home</Button>
                    <Button color="inherit" href='/sign-in' sx={{mr:2, backgroundColor: 'grey'}}>
                        Sign In    
                    </Button>
                    <Button color="inherit" href='/sign-up'sx={{backgroundColor: 'grey'}}>
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>
            <Box display='flex' flexDirection='column' alignItems='center' sx={{pt: '10vh'}}>
                <Typography variant="h4" gutterBottom>Sign In</Typography>
                <SignIn/>
            </Box>
        </Container>
    )
}