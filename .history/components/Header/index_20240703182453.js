import styles from "./Header.module.css";
import { HamburgerMenu } from "components/ui/HamburgerMenu";
export default function Header() {
  return (
    <>
      <p className={styles.head}>
        <HamburgerMenu />
      </p>
    </>
  );
}
