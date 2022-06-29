import styles from "./styles/MainContainer.module.css";

function MainContainer({ children }) {
  return <div className={styles.MainContainer}>{children}</div>;
}

export { MainContainer };
