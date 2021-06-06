import { useContext, useState, useEffect } from "react";

import Image from "next/image"
import styles from "../styles/pages/carrinho/styles.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

import MainContext from "../context/MainContext";

export function Carrinho() {
   const {
      item,
      totalProduct,
      totalValue,
      adicionarMais,
      removeProduto
   } = useContext(MainContext);

   console.log(totalProduct);
   console.log(totalValue);
   return (
      <div className={styles.carrinhoContainer}>
         <h1>Seu carrinho de compras</h1>

         <section>
            <ul>
               {item.map(item => {
                  return (
                     <>
                        {item.qtd !== 0 ? (
                           <>
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
                                    <p>Total: R$ {String(item.preco * item.qtd)}</p>
                                    <div className={styles.adicionarMais}>
                                       <button>
                                          <AiOutlineMinus onClick={() => removeProduto(item, item.id)} />
                                       </button>
                                       <p>{item.qtd}</p>
                                       <button onClick={() => adicionarMais(item)}>
                                          <AiOutlinePlus />
                                       </button>
                                    </div>
                                 </div>
                              </li>
                           </>
                        ) : ""}
                     </>
                  )
               })}

               {totalValue === 0 ? "" : (
                  <li className={styles.total}>Total: R$ {totalValue}</li>
               )}
            </ul>
         </section>
      </div>
   );
}

export default Carrinho;