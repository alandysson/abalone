import { useContext } from "react";
import { GetStaticProps, GetStaticPaths } from 'next'
import { api } from '../services/api'
import { Item } from "../components/Item";

import MainContext from "../context/MainContext";

import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './home.module.scss';
import { ItemType } from "../types";
import { CustomPagination } from "../components/Pagination";
import Link from "next/link";

type HomeProps = {
   items: ItemType[];
   pageable: {
      currentPage: number,
      totalPages: number
   }
}

export default function Home({ items, pageable }: HomeProps) {
   const { category, superUser } = useContext(MainContext);
   // TODO: try get HomePerPage in this component
   return (
      <div className={styles.container}>
         <Head>
            <title>Abalone</title>
         </Head>
         <main className={styles.homePage}>
            {superUser &&
               <div className={styles.addNewItem}>
                  <Link href="/admin/cadastrar">Cadastrar novo produto</Link>
               </div>
            }
            <section>
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
         <div className={styles.pagination}>
            <CustomPagination props={pageable} />
         </div>
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   const { data } = await api.get(`buscar`);
   const pageable = {
      currentPage: data.pageable.pageNumber + 1,
      totalPages: data.totalPages,
   }
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
         pageable
      },
      revalidate: 60 * 60 * 8,
   }
}