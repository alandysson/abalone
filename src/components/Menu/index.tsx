import { useContext } from "react";
import { AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineShoppingCart } from "react-icons/ai"
import Link from "next/link";
import styles from "./styles.module.scss";
import MainContext from "../../context/MainContext";
import { Navbar as NvBar, Nav } from "react-bootstrap";

export default function Menu() {
   const { totalProduct, filterCategory, category } = useContext(MainContext);

   return (
      <div className={styles.menuContainer}>
         <div className={styles.menuItems}>
            <NvBar expand="lg">
               <NvBar.Toggle aria-controls="basic-navbar-nav" />
               <NvBar.Collapse className={styles.space} id="basic-navbar-nav">
                  <div className={styles.menuLeft}>
                     <AiOutlineInstagram color="purple" />
                     <a href="https://www.instagram.com/abaloneprataria/">
                        abaloneprataria
                     </a>
                     <AiOutlineWhatsApp color="green" />
                     <a href="https://api.whatsapp.com/send?phone=5561981874554">
                        Entre em contato
                     </a>
                  </div>
                  <div className={styles.menuRight}>
                     <select
                        className={styles.select}
                        defaultValue={category}
                        onChange={filterCategory}
                     >
                        <option value={""}>Categorias</option>
                        <option value={"brinco"}>Brincos</option>
                        <option value={"pulseira"}>Pulseiras</option>
                        <option value={"colar"}>Colares</option>
                     </select>
                     <Link href="/carrinho">
                        <AiOutlineShoppingCart
                           color="black"
                           size={25}
                        />
                     </Link>
                     {totalProduct === 0 ? "" : <span>{totalProduct}</span>}
                  </div>
               </NvBar.Collapse>
            </NvBar>
         </div>
      </div>
   );
}