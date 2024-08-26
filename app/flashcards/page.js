'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import Head from "next/head";
import { SignedIn, UserButton } from "@clerk/nextjs";



import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, Grid, Stack, Toolbar, Typography } from "@mui/material"

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards(){
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [] // this is all of the user's saved Flashcards
                setFlashcards(collections)
            }
            else {
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></> // page will not load is user is not signed in
    }

    // handling each card click
    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    const removeCard = async (flashcard) => {
        const userFlashcardRef = doc(collection(db, "users"), user.id);
        const userFlashcardSnap = await getDoc(userFlashcardRef);
      
        if (userFlashcardSnap.exists) {
          const updatedFlashcards = userFlashcardSnap.data().flashcards.filter(
            (item) => item.name !== flashcard.name // Filter out deleted card
          );

          if (updatedFlashcards === 1) {
            await deleteDoc(userFlashcardRef)
          }
          else {
            await setDoc(userFlashcardRef, { flashcards: updatedFlashcards });
          }
      
          // Update the flashcards state to trigger a re-render
          setFlashcards(updatedFlashcards);
        } else {
          console.error("Error: User flashcards document not found!");
        }
    };

    //display all of the flashcards
    return <Container maxWidth='100vw'>
        <Head>
            <title>FlashCard Saved Collections</title>
            <meta name="description" content="Saved flashcard collections" />
        </Head>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    FlashCard SaaS
                </Typography>
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
        <Grid container spacing={3} 
            sx={{mt: 4}}
        >
            {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <Box>
                            <Stack direction="row" sx={{justifyContent: 'space-between'}}>
                                <CardActionArea onClick={() => {handleCardClick(flashcard.name)}}>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <Button variant="contained" color="warning" onClick={() => {removeCard(flashcard)}}>Delete Flashcard</Button>
                            </Stack>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
}