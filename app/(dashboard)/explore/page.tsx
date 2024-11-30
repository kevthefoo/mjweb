"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";

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

    const handleCopyToClipboard = (prompt: string, tags: string) => {
        const textToCopy = `${prompt}\n${tags}`;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                toast.success("Prompt copied to clipboard");
            })
            .catch(() => {
                toast.error("Prompt copied to clipboard");
            });
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
                    ? "no-scrollbar h-full bg-neutral-800"
                    : "h-full overflow-y-scroll bg-neutral-800"
            }
        >
            <div className="relative columns-5 gap-0">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="cursor-pointer border-2 border-white"
                        onClick={() => openModal(image)}
                    >
                        <Image
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            height={1000}
                            width={1000}
                            priority={true}
                            className={
                                isModalOpen
                                    ? "h-full w-full blur-lg"
                                    : "h-full w-full"
                            }
                        />
                    </div>
                ))}

                {isModalOpen && selectedImage && (
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full bg-black bg-opacity-90 py-4"
                        onClick={handleOverlayClick}
                    >
                        <div
                            className="absolute right-0 top-0 z-50 flex h-8 w-8 cursor-pointer items-center justify-center p-8 text-2xl font-bold"
                            onClick={handleOverlayClick}
                        >
                            X
                        </div>
                        <div
                            className="relative h-full w-2/3 p-4"
                            onClick={handleOverlayClick}
                        >
                            <Image
                                src={selectedImage.url}
                                alt={selectedImage.metadata.job_id}
                                fill={true}
                                priority={true}
                                className="object-contain"
                            />
                            <Image
                                src={selectedImage.url.replace(".webp", ".jpg")}
                                alt={selectedImage.metadata.job_id}
                                fill={true}
                                priority={true}
                                className="object-contain"
                            />
                        </div>
                        <div className="w-1/3 p-4" onClick={handleOverlayClick}>
                            <h1 className="mb-4">Prompt</h1>
                            <p className="mb-4">
                                {selectedImage.metadata.prompt}
                            </p>

                            <div className="mb-4 flex flex-wrap gap-4">
                                {selectedImage.metadata.tags
                                    .split(",")
                                    .filter((tag) => tag.trim() !== "")
                                    .map((tag, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg border-2 border-white p-1"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                            </div>
                            <button
                                onClick={() =>
                                    handleCopyToClipboard(
                                        selectedImage.metadata.prompt,
                                        selectedImage.metadata.tags.replaceAll(
                                            ",",
                                            " "
                                        )
                                    )
                                }
                                className="rounded-lg border-2 border-white bg-blue-500  text-white hover:bg-blue-600 p-1"
                            >
                                Copy This Prompt
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
