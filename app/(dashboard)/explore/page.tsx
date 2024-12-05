"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

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
  const [isSlidePrompt, setIsSlidePrompt] = useState(false);

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
    setIsSlidePrompt(false);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleSlidePrompt = () => {
    setIsSlidePrompt(!isSlidePrompt);
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
      <div className="relative columns-5 gap-0 max-lg_tablet:columns-4 max-rg_tablet:columns-3 max-lg_mobile:columns-2">
        {/* <div className="relative aspect-[56%] w-full border-2 border-red-500 bg-[url('https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp')] bg-cover bg-center bg-no-repeat"></div> */}
        <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
                <Image
          src="https://d2gm97t1rhxlx0.cloudfront.net/79760127150122/29c54a9d-2382-4042-b86f-b5fa06ed6e57.webp"
          alt="d"
          height={1000}
          width={1000}
          priority={true}
          className="h-full w-full"
        ></Image>
        {/* {images.map((image, index) => (
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
                isModalOpen ? "h-full w-full blur-lg" : "h-full w-full"
              }
            />
          </div>
        ))} */}

        {isModalOpen && selectedImage && (
          <div
            className="absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full bg-black bg-opacity-90 py-4 max-lg_mobile:fixed max-lg_mobile:z-20 max-lg_mobile:flex-col max-lg_mobile:py-0"
            onClick={handleOverlayClick}
          >
            <div
              className="absolute right-0 top-0 z-50 flex h-8 w-8 cursor-pointer items-center justify-center p-8 text-2xl font-bold"
              onClick={handleOverlayClick}
            >
              X
            </div>
            <div
              className="relative h-full w-2/3 p-4 max-lg_mobile:h-screen max-lg_mobile:w-full max-lg_mobile:p-0"
              onClick={handleOverlayClick}
            >
              <Link href={selectedImage.metadata.jpg_url} target="_blank">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.metadata.job_id}
                  fill={true}
                  priority={true}
                  className="object-contain"
                />
              </Link>

              <Link href={selectedImage.metadata.jpg_url} target="_blank">
                <Image
                  src={selectedImage.url.replace(".webp", ".jpg")}
                  alt={selectedImage.metadata.job_id}
                  fill={true}
                  priority={true}
                  className="object-contain"
                />
              </Link>
            </div>
            <div
              className={
                isSlidePrompt
                  ? "duration-400 w-1/3 p-4 transition-all ease-linear max-lg_mobile:absolute max-lg_mobile:top-[calc(100%)] max-lg_mobile:w-full max-lg_mobile:translate-y-[-100%] max-lg_mobile:rounded-t-3xl max-lg_mobile:bg-neutral-700 max-lg_mobile:bg-opacity-95 max-lg_mobile:text-sm"
                  : "duration-400 w-1/3 p-4 transition-all ease-linear max-lg_mobile:absolute max-lg_mobile:top-[92.5%] max-lg_mobile:w-full max-lg_mobile:rounded-t-3xl max-lg_mobile:bg-neutral-700 max-lg_mobile:bg-opacity-95 max-lg_mobile:text-sm"
              }
              onClick={handleOverlayClick}
            >
              <div
                className="absolute left-1/2 top-2 hidden -translate-x-1/2 transform text-xl max-lg_mobile:block"
                onClick={handleSlidePrompt}
              >
                {isSlidePrompt ? (
                  <FaArrowAltCircleDown />
                ) : (
                  <FaArrowAltCircleUp />
                )}
              </div>

              <h1 className="mb-4">Prompt</h1>
              <p
                className="mb-4 cursor-pointer text-slate-300 hover:text-slate-50"
                onClick={() =>
                  handleCopyToClipboard(
                    selectedImage.metadata.prompt,
                    selectedImage.metadata.tags.replaceAll(",", " "),
                  )
                }
              >
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
