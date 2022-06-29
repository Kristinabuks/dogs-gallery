import { useEffect, useState } from "react";

function useInnerWidth() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const updateInnerWidth = function () {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateInnerWidth);

    return () => {
      window.removeEventListener("resize", updateInnerWidth);
    };
  }, [innerWidth, setInnerWidth]);
}

export { useInnerWidth };
