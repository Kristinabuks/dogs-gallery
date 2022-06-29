import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import styles from "./styles/PhotoSelector.module.css";

/*

TODO:

setPhotoURL(URL.createObjectURL(e.target.files[0]));
...
let photo = (await fetch(url)).blob();

*/

function PhotoSelector({ photo, isLocked, setPhoto }) {
  const [photoURL, setPhotoURL] = useState(null);

  function removePhoto() {
    setPhotoURL(null);
    setPhoto(null);
  }

  return (
    <div>
      <label>
        Select a photo:
        <br></br>
        <input
          disabled={isLocked}
          onChange={(e) => {
            setPhoto(e.target.files[0]);
            setPhotoURL(URL.createObjectURL(e.target.files[0]));
          }}
          type="file"
          name="photo"
          title=""
          className={styles.InputButton}
          required
        ></input>
        <span
          className={classnames({
            [styles.PrettyButton]: true,
            [styles.PrettyButton_disabled]: isLocked,
          })}
        >
          {photo ? `Файл: ${photo.name}` : "Выберите файл"}
        </span>
      </label>
      <br></br>
      <div className={styles.Preload}>
        {photo ? (
          <div className={styles.PreloadImageContainer}>
            <img
              className={styles.PreloadImage}
              src={photoURL}
              alt="Предзагрузка"
            />
            <FontAwesomeIcon
              className={styles.CloseIcon}
              icon={faCircleXmark}
              onClick={!isLocked ? () => removePhoto() : () => {}}
            ></FontAwesomeIcon>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export { PhotoSelector };
