import { NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

export async function GET() {
  try {
    const client = new S3Client({ region: "us-east-1" });
    console.log("Fetching images from S3");

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const input = {
      Bucket: "mjgallery",
      MaxKeys: 2000,
      prefix: formattedDate,
    };

    const command = new ListObjectsV2Command(input);
    const response = await client.send(command);

    const images = await Promise.all(
      response.Contents?.map(async (item) => {
        if (!item.Key || item.Key.endsWith(".jpg")) {
          return null; // Skip .jpg files
        }

        const headParams = {
          Bucket: "mjgallery",
          Key: item.Key,
        };
        const headCommand = new HeadObjectCommand(headParams);
        const headResponse = await client.send(headCommand);

        return {
          url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
          metadata: headResponse.Metadata,
        };
      }) || [],
    ).then((results) => results.filter((item) => item !== null)); // Filter out null values

    return NextResponse.json({ images: images });
  } catch (error) {
    console.error("Error fetching images from S3:", error);
    return NextResponse.json(
      { error: "Failed to fetch images from S3" },
      { status: 500 },
    );
  }
}
