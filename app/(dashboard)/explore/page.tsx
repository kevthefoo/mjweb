"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type ImageType = {
    url: string;
    metadata: {
        job_id: string;
        jpg_url: string;
        webp_url: string;
        prompt: string;
        tags: string;
    };
};

export default function Explore() {
    const [images, setImages] = useState<ImageType[]>([]);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    useEffect(() => {
        fetchImage();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen]);

    const openModal = (image: ImageType) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    return (
        <section
            className={
                isModalOpen
                    ? "h-full border-2 border-green-400"
                    : "h-full border-2 border-green-400 overflow-y-scroll"
            }
        >
            <div
                className={
                    isModalOpen
                        ? "relative columns-5 gap-0 border-4 border-blue-700 "
                        : "relative columns-5 gap-0 border-4 border-red-700"
                }
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="border-2 border-white cursor-pointer"
                        onClick={() => openModal(image)}
                    >
                        <Image
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            height={1000}
                            width={1000}
                            priority={index < 35}
                            className={
                                isModalOpen
                                    ? "h-full w-full blur-lg"
                                    : "h-full w-full "
                            }
                        />
                    </div>
                ))}

                {isModalOpen && selectedImage && (
                    <div
                        className="absolute inset-0 flex items-center bg-black bg-opacity-90  border-2 border-red-500 h-screen"
                        onClick={handleOverlayClick}
                    >
                        <div className="relative border-2 border-white  p-4 w-2/3 h-screen">
                            <Image
                                src={selectedImage.url}
                                alt={selectedImage.metadata.job_id}
                                fill={true}
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
