import styles from "./styles/TitleFigure.module.css";
import { useDispatch } from "react-redux";
import classnames from "classnames";

function TitleFigure(props) {
  const dispatch = useDispatch();
  const toggleSidebar = () => dispatch({ type: "TOGGLE_SIDEBAR" });

  let button;
  let breed;
  let height_aboutbreed;

  if (props.defaultPhoto.breed) {
    breed = props.defaultPhoto.breed;
    button = (
      <button className={styles.ButtonCare} onClick={() => toggleSidebar()}>
        Особенности ухода
      </button>
    );
    height_aboutbreed = false;
  } else {
    breed = "";
    button = <div></div>;
    height_aboutbreed = true;
  }

  return (
    <figure className={styles.Figure}>
      <div className={styles.ImageContainer}>
        <img
          className={styles.Image}
          src={props.defaultPhoto.photo}
          alt="Главное фото"
        ></img>
      </div>
      <div className={styles.AboutBreedContainer}>
        <div>
          <h4 className={styles.Breed}>{breed}</h4>
        </div>
        <div
          className={classnames({
            [styles.AboutBreed]: true,
            [styles.AboutBreed_height]: height_aboutbreed,
          })}
        >
          <div>{props.defaultPhoto.description}</div>
          <p></p>
        </div>
        <div className={styles.ButtonCareContainer}>{button}</div>
      </div>
    </figure>
  );
}

export { TitleFigure };
