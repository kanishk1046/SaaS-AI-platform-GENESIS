import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Configuration from "openai";

import { OpenAI } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // Add other configuration options as needed
});
const openai = new OpenAI(configuration);
export async function POST(
    req: Request
){
    try{
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        if(!configuration.apiKey){
            return new NextResponse("OpenAI API Key is not configured", {status:500});
        }

        if(!messages){
            return new NextResponse("Messages are required", {status:400});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        return NextResponse.json(response.choices[0].message);

    }catch (error){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("internal error", {status : 500});
    }
}