import styles from "./styles/PhotoFigure.module.css";
import { useDispatch } from "react-redux";
import { ImageLoad } from "./ImageLoad.tsx";

function PhotoFigure({ dog }) {
  const dispatch = useDispatch();
  const setdefaultPhoto = (p) =>
    dispatch({ type: "SET_DEFAULT_PHOTO", payload: p });
  return (
    <div className={styles.Container}>
      <figure
        className={styles.Figure}
        onClick={() => {
          setdefaultPhoto(dog);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <ImageLoad source={dog.photo} />
        <div className={styles.Breed}>{dog.breed}</div>
      </figure>
    </div>
  );
}

export { PhotoFigure };
