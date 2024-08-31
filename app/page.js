'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {

  let basicBool = false
  let proBool = false

  const handleSubmit = async () => {
    if (proBool) {
      const checkoutSession = await fetch('/api/checkout_session_pro', {
        method: 'POST',
        headers: {
          origin: 'https://flashcard-saas-ivory.vercel.app'
        }
      })

      const checkoutSessionJson = await checkoutSession.json()

      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message)
        return
      }
  
      const stripe = await getStripe()
      const {error} = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id
      })
  
      if (error) {
        console.warn(error.message)
      }
    } 
    else if (basicBool) {
      console.log('Basic bool:', basicBool)
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          origin: 'https://flashcard-saas-ivory.vercel.app'
        }
      })

      const checkoutSessionJson = await checkoutSession.json()

      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message)
        return
      }
  
      const stripe = await getStripe()
      const {error} = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id
      })
  
      if (error) {
        console.warn(error.message)
      }
    }
  }

  return (
    <Container maxWidth='100vw'>
      <Head>
        <title>CardsAI</title>
        <meta name="description" content="Create flashcard from text" />
      </Head>
      <AppBar position="fixed" sx={{width: '100vw', pl: '0px', pr: '0px', zIndex: '9999', backgroundColor: 'rgba(0,0,0,0.85)', boxShadow: '10'}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            CardsAI
          </Typography>
          <SignedOut>
            <Button color="inherit" href='/sign-in' sx={{mr:2, backgroundColor: 'grey'}}>Sign In</Button>
            <Button color="inherit" href='/sign-up' sx={{ml:2, ml: 2, backgroundColor: 'grey'}}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <Button color="inherit" href="/" sx={{mr:2, backgroundColor: 'grey'}}>Home</Button>
            <Button color="inherit" href="/generate" sx={{mr:2, backgroundColor: 'grey'}}>Generate</Button>
            <Button color="inherit" href="/flashcards" sx={{mr:2, backgroundColor: 'grey'}}>Saved</Button>
            <Button>
              <UserButton/>
            </Button>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
        sx = {{
          textAlign: 'center',
          pt: '25vh',
          pb: '15vh',
          backgroundColor: 'rgba(245,245,247,1)',
          color: 'rgba(72,72,75,0.85)'
        }}
      >
        <Typography variant="h2" sx={{pb: '10vh'}}>Welcome to CardsAI</Typography>
        <Typography variant="h5" gutterBottom sx={{color: 'rgba(0,0,0,1)'}}>
          {' '}
          The easiest way to make FlashCards from Text.
        </Typography>
        <SignedIn>
          <Button variant="contained" color="primary" sx={{mt: 2, backgroundColor: 'black'}} href='/generate'>Let's Generate</Button>
        </SignedIn>
        <SignedOut>
          <Button variant="contained" color="primary" sx={{mt: 2, mr:2, backgroundColor: 'black'}} href='/sign-in'>Sign In</Button>
          <Button variant="contained" color="primary" sx={{mt: 2, ml:2, backgroundColor: 'black'}} href='/sign-up'>Sign Up</Button>
        </SignedOut>
      </Box>
      <Box sx = {{my: 1, pt: '15vh', pl: '12vw', pr: '12vw', pb: '15vh' , backgroundColor: 'black', color: '#fff'}}>
        <Typography variant="h4" sx={{pb:10, fontWeight: 'bold'}}>
          FEATURES
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              {' '}
              Simply input your text and let us do the rest. Creating FlashCards has never been easier
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 0, textAlign: 'center', pt: '15vh', pb: '15vh', pl: '12vw', pr: '12vw', backgroundColor: 'rgba(245,245,247,1)', color: 'black'}}>
        <Typography variant="h4" sx={{pb: '10vh', fontWeight: 'bold'}}>PRICING</Typography>
        <Grid container spacing={4} paddingLeft={'10vw'} paddingRight={'10vw'}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: '#fff',
              backgroundColor: 'rgba(72,72,75,0.85)',
              color: '#fff',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5/month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2, backgroundColor: 'black'}} onClick={() => {
                  basicBool = true;
                  handleSubmit();
                }}>
                  Choose Basic
                </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: '#fff',
              backgroundColor: 'rgba(72,72,75,0.85)',
              color: '#fff',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10/month</Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2, backgroundColor: 'black'}} onClick={() => {
                  proBool = true;
                  handleSubmit();
                }}>
                  Choose Pro
                </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box borderTop= '1px solid grey'
        sx={{
          backgroundColor: '#d7cece',
          color: 'black',
          textAlign: 'left',
          pl: '3vw',
          pt: '1vw',
          pb: '1vw',
          fontSize: '0.75em'
        }}
      >
        <label>Copyright © 2024 CardsAI</label>
      </Box>
    </Container>
  );
}
