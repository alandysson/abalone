import Link from "next/link";
import styles from "./styles.module.scss";

export default function Navbar() {
   return (
      <div className={styles.navbarContainer}>
         <Link href="/">
            <img src="/logo-navbar.png" alt="Logo home" />
         </Link>
      </div>
   );
}