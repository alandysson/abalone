import { useContext } from "react";

import Image from "next/image"
import styles from "../../styles/pages/carrinho/styles.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

import MainContext from "../../context/MainContext";

export function Carrinho() {
   const {
      item,
      totalValue,
      adicionarMais,
      removeProduto
   } = useContext(MainContext);

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
                                       src="/logo-navbar.png"
                                       alt={item.nome}
                                       objectFit="cover"
                                    />
                                 </span>

                                 <div className={styles.itemDescription}>
                                    <h3>{item.nome}</h3>
                                    <p>Total: R$ {String(item.valor * item.qtd)}</p>
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
            </ul>
            {totalValue === 0 ? "" : (
               <p className={styles.total}>Total: R$ {totalValue}</p>
            )}
         </section>
      </div>
   );
}

export default Carrinho;