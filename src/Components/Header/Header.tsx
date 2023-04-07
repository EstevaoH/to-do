import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} />
      <h1>
        <span className={styles.titleFirtPart}>to</span>
        <span className={styles.titleSecondPart}>do</span>
      </h1>
    </header>
  );
}
