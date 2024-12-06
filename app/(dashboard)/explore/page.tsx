"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import galleryImageData from "@/data/galleryImageData/imageData.json";
import Image from "next/image";
import { toast } from "sonner";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

type ImageData = {
  job_id: string;
  prompt: string;
  tags: string[];
  webp_url: string;
  jpg_url: string;
  ratio: string;
  object_name: string;
  timestamp: number;
};

export default function Explore() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlidePrompt, setIsSlidePrompt] = useState(false);
  const containerRef = useRef(null);
  // const [columnWidth, setColumnWidth] = useState(0);

  const getLast32Items = (
    obj: Record<string, ImageData>,
  ): Record<string, ImageData> => {
    const entries = Object.entries(obj);
    const last32Entries = entries.slice(-32);
    return Object.fromEntries(last32Entries);
  };

  const last32Items = getLast32Items(galleryImageData);

  // Calculate column width
  // useEffect(() => {
  //   if (containerRef.current) {
  //     const containerWidth = containerRef.current.offsetWidth;
  //     setColumnWidth(containerWidth / 4);
  //   }
  // }, [containerRef.current]);

  // ESC key to close modal
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

  // Open modal
  const openModal = (image: ImageData) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setIsSlidePrompt(false);
  };

  // Close modal on overlay click
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  // Slide up or down prompt section on mobile
  const handleSlidePrompt = () => {
    setIsSlidePrompt(!isSlidePrompt);
  };

  // Copy prompt to clipboard
  const handleCopyToClipboard = (prompt: string, tags: string[]) => {
    const tag_string = tags.join(" ").trim();
    console.log(tag_string);
    const textToCopy = `${prompt} ${tag_string}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Prompt copied to clipboard");
      })
      .catch(() => {
        toast.error("Prompt copied to clipboard");
      });
  };

  // Disable scroll when modal is open
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

  //-----------------------------------------------------------------------------------------------------------------

  return (
    <section
      className={
        isModalOpen
          ? "no-scrollbar h-full bg-neutral-800"
          : "h-full overflow-y-scroll bg-neutral-800"
      }
    >
      <div
        ref={containerRef}
        className="relative columns-5 gap-0 max-lg_tablet:columns-4 max-rg_tablet:columns-3 max-lg_mobile:columns-2"
      >
        {/* {Object.values(last32Items).map((item, index) => {
          const divHeight = Math.round(
            (columnWidth / item.ratio.split(":")[0]) * item.ratio.split(":")[1],
          );
          return (
            <div
              key={index}
              style={{
                backgroundImage: `url('https://d2gm97t1rhxlx0.cloudfront.net/${item.object_name}.webp')`,
                height: `${divHeight}px`,
              }}
              className={
                isModalOpen
                  ? "cursor-pointer border-2 border-white bg-cover bg-center bg-no-repeat blur-lg"
                  : "cursor-pointer border-2 border-white bg-cover bg-center bg-no-repeat"
              }
              onClick={() => openModal(item)}
            ></div>
          );
        })} */}

        {Object.values(last32Items).map((item, index) => (
          <div
            key={index}
            className="cursor-pointer border-2 border-white"
            onClick={() => openModal(item)}
          >
            <Image
              src={`https://d2gm97t1rhxlx0.cloudfront.net/${item.object_name}.webp`}
              alt={`${item.job_id}.webp`}
              height={1000}
              width={1000}
              priority={true}
              className={
                isModalOpen ? "h-full w-full blur-lg" : "h-full w-full"
              }
            />
          </div>
        ))}

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
              <Link href={selectedImage.jpg_url} target="_blank">
                <Image
                  src={`https://d2gm97t1rhxlx0.cloudfront.net/${selectedImage.object_name}.webp`}
                  alt={selectedImage.job_id}
                  fill={true}
                  priority={true}
                  className="object-contain"
                />
              </Link>

              <Link href={selectedImage.jpg_url} target="_blank">
                <Image
                  src={`https://d2gm97t1rhxlx0.cloudfront.net/${selectedImage.object_name}.jpg`}
                  alt={selectedImage.job_id}
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
                    selectedImage.prompt,
                    selectedImage.tags,
                  )
                }
              >
                {selectedImage.prompt}
              </p>

              <div className="mb-4 flex flex-wrap gap-4">
                {selectedImage.tags
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
