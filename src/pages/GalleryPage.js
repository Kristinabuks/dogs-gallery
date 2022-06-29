import styles from "./styles/Gallery.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadDogs } from "../async/dogs";
import { buildColumn } from "../buildColumn";
import { PhotoColumn } from "../components/PhotoColumn";
import { TitleFigure } from "../components/TitleFigure";
import { Sidebar } from "../components/UI/Sidebar/Sidebar";

function Gallery() {
  const dogs = useSelector((state) =>
    state.dogs ? buildColumn(state.dogs) : []
  );
  const defaultPhoto = useSelector((s) => s.defaultPhoto);
  return (
    <div className={styles.Container}>
      <header className={styles.Header}>
        <TitleFigure defaultPhoto={defaultPhoto} />
      </header>
      <Sidebar defaultPhoto={defaultPhoto} />
      <main className={styles.Content}>
        {dogs &&
          dogs.map((dog, index) => <PhotoColumn key={index} dog={dog} />)}
      </main>
      <footer className={styles.Footer}>IT IS WORKING</footer>
    </div>
  );
}

function GalleryPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDogs());
  }, []);
  return <Gallery />;
}

export { Gallery, GalleryPage };
