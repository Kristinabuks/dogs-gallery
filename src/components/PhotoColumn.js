import { PhotoFigure } from "./PhotoFigure";
import styles from "./styles/PhotoColumn.module.css";

function PhotoColumn(props) {
  return (
    <div className={styles.PhotoColumn}>
      {props.dog.map((dog) => (
        <PhotoFigure key={dog.photo} dog={dog} />
      ))}
    </div>
  );
}

export { PhotoColumn };
