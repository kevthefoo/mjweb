"use client";
import { useState } from "react";
import Image from "next/image";

type ImageType = {
    url: string;
    metadata: Record<string, null>;
};

export default function Explore() {
    const [images, setImages] = useState<ImageType[]>([]);

    const fetchImage = async () => {
        try {
            const response = await fetch("/api/gallery");
            if (!response.ok) {
                throw new Error("Failed to fetch images");
            }
            const data = await response.json();
            const image_data = data.images;
            setImages(image_data);
           
        } catch (error) {
            console.error(error);
            return;
        }
    };

    return (
        <section className="w-full h-full overflow-y-scroll">
            <div className="columns-5 gap-0">
                <div onClick={fetchImage}>fetchImage</div>
                {images.map((image, index) => (
                    <div key={index} className="border-2 border-white">
                        <Image
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            height={1000}
                            width={1000}
                            priority={index < 5}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
