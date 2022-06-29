import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Sidebar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function Sidebar(props) {
  const showSidebar = useSelector((s) => s.showSidebar);

  const dispatch = useDispatch();
  const toggleSidebar = () => dispatch({ type: "TOGGLE_SIDEBAR" });

  return (
    <div
      className={classnames({
        [styles.Sidebar]: true,
        [styles.Sidebar_show]: showSidebar,
      })}
    >
      <FontAwesomeIcon
        className={styles.CloseIcon}
        icon={faCircleXmark}
        onClick={() => {
          toggleSidebar();
        }}
      ></FontAwesomeIcon>
      <div className={styles.Text}>
        <ReactMarkdown>{props.defaultPhoto.care}</ReactMarkdown>
      </div>
    </div>
  );
}

export { Sidebar };
