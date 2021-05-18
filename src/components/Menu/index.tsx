import { useContext, useState } from "react";
import { AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineShoppingCart } from "react-icons/ai"

import styles from "./styles.module.scss";
import MainContext from "../../context/MainContext";

export default function Menu() {
   const [age, setAge] = useState('');
   const handleChange = (event) => {
      setAge(event.target.value);
   };
    
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
                  defaultValue={age}
                  onChange={handleChange}
               >
                  <option >Categorias</option>
                  <option value={10}>Brincos</option>
                  <option value={20}>Pulseiras</option>
                  <option value={30}>Colares</option>
               </select>
               <AiOutlineShoppingCart 
                  color="black" 
                  size={25}
               />
               <span>1</span>
            </div>
         </div>
      </div>
   );
}