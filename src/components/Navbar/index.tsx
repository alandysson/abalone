import styles from "./styles.module.scss";

export default function Navbar() {
   return (
      <div className={styles.navbarContainer}>
         <a href="/">
            <img src="/logo-navbar.png" alt="Logo home" />
         </a>
      </div>
   );
}