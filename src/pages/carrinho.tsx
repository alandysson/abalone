import { useContext } from "react";
import Image from "next/image"
import MainContext from "../context/MainContext";
import styles from "../styles/pages/carrinho/styles.module.scss";


export function Carrinho() {
   const { totalItems, totalProduct } = useContext(MainContext);

   function removeDuplicado() {
      for (var i = 0; i <= totalItems.length; i++) {
         var qtdItems = [];
         var elemento = totalItems[i];
         var index = totalItems.indexOf(elemento);
         while (index != -1) {
            qtdItems.push(index);
            index = totalItems.indexOf(elemento, index + 1);
         }

         if (qtdItems.length > 1) {
            totalItems.splice(totalItems.indexOf(totalItems[i]), 1);
         }
      }
   }

   removeDuplicado();
   console.log(totalItems);
   return (
      <div className={styles.carrinhoContainer}>
         <h1>Seu carrinho de compras</h1>

         <section>
            <ul>
               {totalItems.map(item => {
                  return (
                     <li key={item.id}>
                        <span>
                           <Image
                              width={120}
                              height={120}
                              src={item.thumbnail}
                              alt={item.title}
                              objectFit="cover"
                           />
                        </span>

                        <div className={styles.itemDescription}>
                           <h3>{item.title}</h3>
                           <p>Preço: R${String(item.preco)}</p>
                           <button></button>
                        </div>
                     </li>
                  )
               })}
            </ul>
         </section>
      </div>
   );
}

export default Carrinho;