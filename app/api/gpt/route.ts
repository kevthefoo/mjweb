import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
    const data = await req.json();

    const userPrompt = data.message;
    console.log(userPrompt);    
    try {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: userPrompt,
        });

        return NextResponse.json(
            { result: completion.choices[0].message },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 520 }
        );
    }
}
