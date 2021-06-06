import { useContext } from "react";
import { AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineShoppingCart } from "react-icons/ai"
import Link from "next/link";
import styles from "./styles.module.scss";
import MainContext from "../../context/MainContext";

export default function Menu() {
   const { totalProduct, filterCategory, category } = useContext(MainContext);

   return (
      <div className={styles.menuContainer}>
         <div className={styles.menuItems}>
            <div className={styles.menuLeft}>
               <AiOutlineInstagram color="purple" /> <p>abaloneprataria</p>
               <AiOutlineWhatsApp color="green" /> <p>Entre em contato</p>
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
         </div>
      </div>
   );
}