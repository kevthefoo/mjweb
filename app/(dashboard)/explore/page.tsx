"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import galleryImageData from "@/data/galleryImageData/imageData.json";
import ImageWithFallback from "@/components/ImageWithFallback";
import { toast } from "sonner";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

type ImageObject = {
  job_id: string;
  prompt: string;
  tags: string[];
  webp_url: string;
  jpg_url: string;
  ratio: string;
  object_name: string;
  timestamp: number;
};

type ImageData = ImageObject[];

export default function Explore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderDataURL =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6IGF1dG87IGRpc3BsYXk6IGJsb2NrOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBzdHlsZT0idHJhbnNmb3JtOnNjYWxlKDAuMDk5OTk5OTk5OTk5OTk5OTkpO3RyYW5zZm9ybS1vcmlnaW46NTBweCA1MHB4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yNC4zIDMwQzExLjQgMzAgNSA0My4zIDUgNTBzNi40IDIwIDE5LjMgMjBjMTkuMyAwIDMyLjEtNDAgNTEuNC00MCBDODguNiAzMCA5NSA0My4zIDk1IDUwcy02LjQgMjAtMTkuMyAyMEM1Ni40IDcwIDQzLjYgMzAgMjQuMyAzMHoiIHN0cm9rZS1kYXNoYXJyYXk9IjQyLjc2NDgyMTM3MDQ0MjcxIDQyLjc2NDgyMTM3MDQ0MjcxIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZT0iIzAwOTlmZiIgZmlsbD0ibm9uZSI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzI1Ni41ODg5MjgyMjI2NTYyNSIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0Ij48L2FuaW1hdGU+CjwvcGF0aD48Zz48L2c+PC9nPjwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8gLS0+PC9zdmc+";
  const [loadedImages, setLoadedImages] = useState<ImageData>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<ImageObject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnNumber, setColumnNumber] = useState(5);

  const [isSlidePrompt, setIsSlidePrompt] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [columnWidth, setColumnWidth] = useState(0);

  const loadMoreItems = useCallback(async () => {
    const itemsPerPage = 32;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const newItems = Object.values(galleryImageData)
      .reverse()
      .slice(startIndex, startIndex + itemsPerPage);

    setLoadedImages((prev) => [...prev, ...newItems]);
    setCurrentPage((prev) => prev + 1);
  }, [currentPage]);

  useEffect(() => {
    // Load the first 32 items when the component mounts
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView) {
      console.log("in view");
      loadMoreItems();
    }
  }, [inView, loadMoreItems]);

  // Calculate column width
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;

      let column: number;

      if (window.innerWidth > 992) {
        column = 5;
      } else if (window.innerWidth > 768) {
        column = 4;
      } else if (window.innerWidth > 576) {
        column = 3;
      } else {
        column = 2;
      }
      setColumnNumber(column);
      setColumnWidth(containerWidth / column);
    }
  }, [containerRef.current]);

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
  const openModal = (image: ImageObject) => {
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
          ? "no-scrollbar min-h-full bg-neutral-800"
          : "h-full overflow-y-scroll bg-neutral-800"
      }
    >
      <div
        ref={containerRef}
        className="relative z-30 h-full w-full gap-0 pb-12"
      >
        {loadedImages
          .reduce<{ height: number }[]>((acc, item) => {
            const divHeight = Math.round(
              (columnWidth / parseInt(item.ratio.split(":")[0], 10)) *
                parseInt(item.ratio.split(":")[1], 10),
            );

            acc.push({ height: divHeight });

            return acc;
          }, [])
          .map((item, index) => {
            const divHeight = item.height;
            const xOffset = columnWidth * (index % columnNumber);
            const yOffset = loadedImages
              .slice(0, index)
              .reduce((sum, { ratio }, i) => {
                return i % columnNumber === index % columnNumber
                  ? sum +
                      Math.round(
                        (columnWidth / parseInt(ratio.split(":")[0], 10)) *
                          parseInt(ratio.split(":")[1], 10),
                      )
                  : sum;
              }, 0);

            if (index == loadedImages.length - 10) {
              return (
                <div
                  key={index}
                  ref={ref}
                  className="absolute cursor-pointer border-2 border-white"
                  onClick={() => openModal(loadedImages[index])}
                  style={{
                    height: `${divHeight}px`,
                    width: `${columnWidth}px`,
                    transform: `translateX(${xOffset}px) translateY(${yOffset}px)`,
                  }}
                >
                  <ImageWithFallback
                    src={`https://d2gm97t1rhxlx0.cloudfront.net/${loadedImages[index].object_name}.webp`}
                    alt={`${loadedImages[index].job_id}.webp`}
                    height={1000}
                    width={1000}
                    priority={true}
                    className={
                      isModalOpen
                        ? "h-full w-full object-contain blur-lg"
                        : "h-full w-full object-contain"
                    }
                  />
                </div>
              );
            }

            return (
              <div
                key={index}
                className="absolute cursor-pointer border-2 border-white"
                onClick={() => openModal(loadedImages[index])}
                style={{
                  height: `${divHeight}px`,
                  width: `${columnWidth}px`,
                  transform: `translateX(${xOffset}px) translateY(${yOffset}px)`,
                }}
              >
                <ImageWithFallback
                  src={`https://d2gm97t1rhxlx0.cloudfront.net/${loadedImages[index].object_name}.webp`}
                  alt={`${loadedImages[index].job_id}.webp`}
                  height={1000}
                  width={1000}
                  priority={true}
                  className={
                    isModalOpen
                      ? "h-full w-full object-contain blur-lg"
                      : "h-full w-full object-contain"
                  }
                />
              </div>
            );
          })}

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
                  src={`https://d2gm97t1rhxlx0.cloudfront.net/${selectedImage.object_name}.jpg`}
                  alt={selectedImage.job_id}
                  fill={true}
                  priority={true}
                  className="object-contain transition-opacity duration-300"
                  onLoadingComplete={(img) => img.classList.remove("opacity-0")}
                  placeholder={placeholderDataURL}
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
