import { Link } from "react-router-dom";
import styles from "./styles/Navbar.module.css";

function Navbar({ greeting, children }) {
  return (
    <div className={styles.Container}>
      <nav className={styles.Navigation}>
        <div className={styles.Greeting}>
          <h1>{greeting}</h1>
        </div>
        <div className={styles.Links}>{children}</div>
      </nav>
    </div>
  );
}

function NavbarItem({ path, description }) {
  return (
    <Link className={styles.Link} to={path} key={path}>
      {description}
    </Link>
  );
}

export { Navbar, NavbarItem };
