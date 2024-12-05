import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

//Handle Stripe checkout events
export async function POST(req: Request) {
  console.log("Received webhook request from gallery crawler...");

  const body = await req.text();

  try {
    const data = JSON.parse(body);

    // Read the existing data from the JSON file
    const filePath = path.join(
      process.cwd(),
      "data/galleryImageData/imageData.json",
    );

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: `Webhook Error` }, { status: 400 });
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
