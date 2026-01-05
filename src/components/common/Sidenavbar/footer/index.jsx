import styles from "./style.module.scss";
import Magnetic from "../../Magnetic";

export default function index() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLine}></div>
      <div className={styles.footerHeader}>Socials</div>
      <div className={styles.footerLinks}>
        <Magnetic>
          <a>Awwwards</a>
        </Magnetic>
        <Magnetic>
          <a>Instagram</a>
        </Magnetic>
        <Magnetic>
          <a>Twitter</a>
        </Magnetic>
        <Magnetic>
          <a>LinkedIn</a>
        </Magnetic>
      </div>
    </div>
  );
}
