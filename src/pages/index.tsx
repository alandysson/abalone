import { useContext } from "react";
import { GetStaticProps } from 'next'
import { api } from '../services/api'
import { Item } from "../components/Item";

import MainContext from "../context/MainContext";

import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './home.module.scss';
import { ItemType } from "../types";

type HomeProps = {
   items: ItemType[];
}

export default function Home({ items }: HomeProps) {
   const { category } = useContext(MainContext);

   return (
      <div className={styles.container}>
         <Head>
            <title>Abalone</title>
         </Head>

         <main className={styles.homePage}>
            <section>
               <a href="/admin/cadastrar">Cadastrar novo produto</a>
               <ul>
                  {category === ""
                     ?
                     (
                        items.map(item => {
                           return <Item props={item} />;
                        })
                     ) :
                     items.filter(filterItems => filterItems.categoria === category)
                        .map(item => {
                           return <Item props={item} />;
                        })
                  }
               </ul>
            </section>
         </main>
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   const { data } = await api.get(`buscar`);
   const items = data.content.map(item => {
      return {
         id: item.id,
         nome: item.nome,
         // thumbnail: item.img,
         categoria: item.categoria,
         valor: item.valor,
         qtd: item.qtd
      }
   })

   return {
      props: {
         items,
      },
      revalidate: 60 * 60 * 8,
   }
}