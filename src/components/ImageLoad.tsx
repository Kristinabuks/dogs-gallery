import styles from "./styles/PhotoFigure.module.css";
import { useProgressiveImage } from "../hooks/useProgressiveImage.ts";
import React, { useMemo } from "react";

interface ImageLoadProps {
  source: string;
}

function ImageLoad({ source }: ImageLoadProps) {
  const isLoaded: boolean = useProgressiveImage(source);

  const style = useMemo(
    () => ({ height: Math.ceil(100 * (2 + Math.random())) }),
    [source]
  );

  if (isLoaded) {
    return <img className={styles.Image} src={source} alt="Photo" />;
  } else {
    return <div className={styles.Loading} style={style}></div>;
  }
}

export { ImageLoad };
