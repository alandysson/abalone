import { useContext, useState } from "react";
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from "next/image";

import { api } from '../services/api'
import styles from './home.module.scss'
import MainContext from "../context/MainContext";


type Item = {
   id: number,
   nome: string,
   // thumbnail: string,
   categoria: string,
   valor: number,
   qtd: number,
}

type HomeProps = {
   items: Item[];
}

export default function Home({ items }: HomeProps) {
   const { addCart, category } = useContext(MainContext);

   function renderItem(item) {
      return (
         <li key={item.id}>
            <span>
               {/* <Image
                  width={120}
                  height={120}
                  src={item.thumbnail}
                  alt={item.title}
                  objectFit="cover"
               /> */}
            </span>

            <div className={styles.itemDetails}>
               <h3>{item.nome}</h3>
               <p>Preço: R${String(item.valor)}</p>
               <button onClick={() => addCart(item)}>Adicionar ao pedido</button>
            </div>
         </li>
      );
   }

   return (
      <div className={styles.container}>
         <Head>
            <title>Abalone</title>
         </Head>

         <main className={styles.homePage}>
            <section>
               <ul>
                  {category === "" ? (
                     items.map(item => {
                        return renderItem(item);
                     })
                  ) :
                     items.filter(filterItems => filterItems.categoria === category)
                        .map(item => {
                           return renderItem(item);
                        })
                  }
               </ul>
            </section>
         </main>
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   const { data } = await api.get("buscar", {
      params: {
         _limit: 12,
         _order: 'desc'
      }
   });

   const items = data.map(item => {
      return {
         id: item.id,
         nome: item.nome,
         // thumbnail: item.thumbnail,
         categoria: item.categoria,
         valor: item.valor,
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