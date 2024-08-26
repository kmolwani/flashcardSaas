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
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            FlashCard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href='/sign-in'>Login</Button>
            <Button color="inherit" href='/sign-up'>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/generate">Generate</Button>
            <Button color="inherit" href="/flashcards">Saved</Button>
            <Button>
              <UserButton/>
            </Button>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
        sx = {{
          textAlign: 'center',
          my: 4
        }}
      >
        <Typography variant="h2" gutterBottom>Welcome to FlashCard SaaS</Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          The easiest way to make FlashCards from Text.
        </Typography>
        <SignedIn>
          <Button variant="contained" color="primary" sx={{mt: 2}} href='/generate'>Get Started</Button>
        </SignedIn>
        <SignedOut>
          <Button variant="contained" color="primary" sx={{mt: 2}} href='/sign-in'>Login</Button>
          <Button variant="contained" color="primary" sx={{mt: 2}} href='/sign-up'>Sign Up</Button>
        </SignedOut>
      </Box>
      <Box sx = {{my: 6}}>
        <Typography variant="h4" gutterBottom>
          Features
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
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4} paddingLeft={'10vw'} paddingRight={'10vw'}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5/month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}} onClick={() => {
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
              borderColor: 'grey.300',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10/month</Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}} onClick={() => {
                  proBool = true;
                  handleSubmit();
                }}>
                  Choose Pro
                </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
