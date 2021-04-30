import styles from "./styles.module.scss";

export default function Navbar(){
    return(
        <div className={styles.navbarContainer}>
            <img src="logo-navbar.png" alt="Logo home"/>
        </div>
    );
}