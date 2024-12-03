import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const data = await req.json();

  const image = data.image;

  try {
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please describe this image, response in json format with only one key called text",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
    });
    console.log(completion.choices[0].message);
    return NextResponse.json(
      { result: completion.choices[0].message },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 520 },
    );
  }
}
