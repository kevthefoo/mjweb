import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST() {
    try {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: "Hi there, how are you.",
                },
            ],
        });
        console.log(completion.choices[0].message);
        return NextResponse.json({ result: completion.choices[0].message }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 520 }
        );
    }
}
