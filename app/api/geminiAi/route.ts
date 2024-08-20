import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  generationConfig: { responseMimeType: "application/json" },
});


export const POST = async (request: Request) => {
  const { question } = await request.json();
  try {
   
    const prompt = generatePrompt(question);
    const result = (await model.generateContent(prompt, {})).response.text();
    const parsedResult = JSON.parse(result);

    // console.log(parsedResult, result)


    return NextResponse.json({reply: parsedResult.content});
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    });
  }
};

const generatePrompt = (query: string) => `
I am making a questionnaire platform, and you're the core ai behind it. Your task is to generate good structured response for me. So, basically i give you content of the users question, based on the question, i show an answer. I want you to give me that answer. 

Your output structure: { content: string } json schema

Here's the query: ${query}
`;
