import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINIAI_API_KEY; // Replace with your Gemini API key

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines

1. Crete clear and concise questions for the fron of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards more accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehenvely.
11. Only generate 12 flashcards.

Remember, the goal is to facilitate effective learning and retaintion of information through these flashcards.

Return in the following JSON format
{
    "flashcards": 
    [{
        "front": str,
        "back": str
    }]
}
`
const genAI = new GoogleGenerativeAI(apiKey)

let model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json" }
});

export async function POST(req) {
  const data = await req.text();

  // Call Gemini API with the prompt and system prompt
  const prompt = systemPrompt + data; // Combine system prompt with user input
  const response = await model.generateContent(prompt)

  // Check if response is successful and extract flashcards
  if (response) {
    const flashcardsOutput = response.response.text();
    const flashcards = JSON.parse(response.response.text())
    return NextResponse.json(flashcards.flashcards);
  } else {
    console.error('Error fetching flashcards from Gemini:', response);
    // Handle error gracefully (e.g., return an error message)
    return NextResponse.json({ error: 'Failed to generate flashcards' });
  }
}

