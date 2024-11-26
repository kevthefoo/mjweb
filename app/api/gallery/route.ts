import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";

export async function GET() {
    try {
        const client = new S3Client({ region: "us-east-1" });
        console.log("Fetching images from S3");

        const input = {
            Bucket: "mjgallery",
            MaxKeys:100,
        };

        const command = new ListObjectsV2Command(input);
        const response = await client.send(command);

        const images = await Promise.all(
            response.Contents?.map(async (item) => {
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
            }) || []
        );
        
        // console.log("images", images);

        return NextResponse.json({ images:images });
    } catch (error) {
        console.error("Error fetching images from S3:", error);
        return NextResponse.json(
            { error: "Failed to fetch images from S3" },
            { status: 500 }
        );
    }
}
