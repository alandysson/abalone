import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai"
import styles from "./styles.module.scss";

export default function Menu() {
   return (
      <div className={styles.menuContainer}>
         <div className={styles.menuItems}>
            <AiOutlineInstagram color="purple" /> <p>abaloneprataria</p>
            <AiOutlineWhatsApp color="green" /> <p>Entre em contato</p>
         </div>
      </div>
   );
}