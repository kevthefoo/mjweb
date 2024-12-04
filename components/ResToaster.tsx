"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";
export default function ResToaster() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 575px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.addEventListener('change', handleResize);
    };
  }, []);
  return (
    <Toaster
      richColors
      expand
      visibleToasts={1}
      position={isMobile ? "top-center" : "bottom-right"}
    />
  );
}
