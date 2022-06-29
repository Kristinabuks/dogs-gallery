import { useEffect, useState } from "react";

const useProgressiveImage = (src: string, debounceMs: number = 500) => {
  const [sourceLoaded, setSourceLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = function () {
      setTimeout(function () {
        setSourceLoaded(true);
      }, debounceMs);
    };
  }, [src]);

  return sourceLoaded;
};

export { useProgressiveImage };
