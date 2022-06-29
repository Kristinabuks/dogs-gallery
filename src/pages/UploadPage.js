import styles from "./styles/UploadPage.module.css";
import { useState } from "react";
import { debounce } from "../async/debounce.js";
import { PhotoSelector } from "../components/PhotoSelector";

function UploadPage() {
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [care, setCare] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const lockFormDecorator = function (fn) {
    return async function (e) {
      setIsLocked(true);
      try {
        await fn(e);
      } finally {
        setIsLocked(false);
      }
    };
  };

  const handleCreate = lockFormDecorator(async function (e) {
    e.preventDefault();

    const body = new FormData();
    body.append("breed", breed);
    body.append("description", description);
    body.append("care", care);
    body.append("photo", photo);

    let res;
    await debounce(async function () {
      try {
        res = await fetch("http://localhost:8000/dogs", {
          body,
          method: "POST",
        });
      } catch (e) {
        alert(e);
      }
    });

    if (res.status !== 200) {
      alert(res);
    } else {
      setBreed("");
      setDescription("");
      setCare("");
      setPhoto(null);
    }
  });

  return (
    <div className={styles.UploadContainer}>
      <form className={styles.UploadForm} onSubmit={handleCreate}>
        <label>Breed:</label>
        <br></br>
        <input
          disabled={isLocked}
          minLength="3"
          maxLength="128"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          type="text"
          name="breed"
          autoComplete="off"
          required
        ></input>
        <br></br>
        <label>Description:</label>
        <br></br>
        <textarea
          disabled={isLocked}
          maxLength="512"
          value={description}
          className={styles.Description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description"
          cols="20"
          rows="10"
          autoComplete="off"
        ></textarea>
        <br></br>
        <label>Care:</label>
        <br></br>
        <textarea
          disabled={isLocked}
          maxLength="512"
          value={care}
          className={styles.Description}
          onChange={(e) => setCare(e.target.value)}
          type="text"
          name="care"
          cols="20"
          rows="10"
          autoComplete="off"
        ></textarea>
        <br></br>
        <PhotoSelector
          photo={photo}
          isLocked={isLocked}
          setPhoto={(p) => setPhoto(p)}
        />
        <input
          disabled={isLocked}
          type="submit"
          value="Загрузить"
          className={styles.ButtonUpload}
          formEncType="multipart/form-data"
          formTarget="_self"
        ></input>
      </form>
    </div>
  );
}

export { UploadPage };
