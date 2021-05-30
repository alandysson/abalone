import { useContext } from "react";
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from "next/image";

import { api } from '../services/api'
import styles from './home.module.scss'
import MainContext from "../context/MainContext";


type Item = {
   id: number,
   title: string,
   thumbnail: string,
   categoria: string,
   preco: number,
   qtd: number,
}

type HomeProps = {
   items: Item[];
}

export default function Home({ items }: HomeProps) {
   const { cart } = useContext(MainContext);
   return (
      <div className={styles.container}>
         <Head>
            <title>Abalone</title>
         </Head>

         <main className={styles.homePage}>
            <section>
               <ul>
                  {items.map(item => {
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

                           <div className={styles.itemDetails}>
                              <h3>{item.title}</h3>
                              <p>Preço: R${String(item.preco)}</p>
                              <button onClick={() => cart(item)}>Adicionar ao pedido</button>
                           </div>
                        </li>
                     );
                  })}
               </ul>
            </section>
         </main>
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   const { data } = await api.get("items", {
      params: {
         _limit: 12,
         _order: 'desc'
      }
   });

   const items = data.map(item => {
      return {
         id: item.id,
         title: item.title,
         thumbnail: item.thumbnail,
         categoria: item.categoria,
         preco: item.valor,
         qtd: item.qtd
      }
   })

   return {
      props: {
         items
      },
      revalidate: 60 * 60 * 8,
   }
}