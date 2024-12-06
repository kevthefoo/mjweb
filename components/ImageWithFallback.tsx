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
  const placeholderDataURL =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6IGF1dG87IGRpc3BsYXk6IGJsb2NrOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBzdHlsZT0idHJhbnNmb3JtOnNjYWxlKDAuMDk5OTk5OTk5OTk5OTk5OTkpO3RyYW5zZm9ybS1vcmlnaW46NTBweCA1MHB4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yNC4zIDMwQzExLjQgMzAgNSA0My4zIDUgNTBzNi40IDIwIDE5LjMgMjBjMTkuMyAwIDMyLjEtNDAgNTEuNC00MCBDODguNiAzMCA5NSA0My4zIDk1IDUwcy02LjQgMjAtMTkuMyAyMEM1Ni40IDcwIDQzLjYgMzAgMjQuMyAzMHoiIHN0cm9rZS1kYXNoYXJyYXk9IjQyLjc2NDgyMTM3MDQ0MjcxIDQyLjc2NDgyMTM3MDQ0MjcxIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZT0iIzAwOTlmZiIgZmlsbD0ibm9uZSI+CiAgPGFuaW1hdGUgdmFsdWVzPSIwOzI1Ni41ODg5MjgyMjI2NTYyNSIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0Ij48L2FuaW1hdGU+CjwvcGF0aD48Zz48L2c+PC9nPjwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8gLS0+PC9zdmc+";

  return (
    <Image
      alt={alt}
      src={imgSrc}
      height={height}
      width={width}
      priority={priority}
      className={className}
      quality={100}
      placeholder={placeholderDataURL}
      onError={() => {
        setImgSrc(image_not_found.src);
      }}
    />
  );
};

export default ImageWithFallback;
