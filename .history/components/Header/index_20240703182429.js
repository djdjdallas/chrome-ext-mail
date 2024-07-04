import styles from "./Header.module.css";
import { HamburgerMenu } from "components/hamburger-menu/index";
export default function Header() {
  return (
    <>
      <p className={styles.head}>
        <HamburgerMenu />
      </p>
    </>
  );
}
