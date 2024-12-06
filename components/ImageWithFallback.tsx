"use client";

import { useState } from "react";
import Image from "next/image";
import image_not_found from "@/assets/image-not-found.webp";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  priority: boolean;
  className: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = (props) => {
  const { src, alt, height, width, priority, className } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      alt={alt}
      src={imgSrc}
      height={height}
      width={width}
      priority={priority}
      className={className}
      quality={100}
      onError={() => {
        setImgSrc(image_not_found.src);
      }}
    />
  );
};

export default ImageWithFallback;
