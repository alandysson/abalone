import { useContext, useState } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { api } from '../services/api'
import { Item } from "../components/Item";

import MainContext from "../context/MainContext";

import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './home.module.scss';
import { ItemType } from "../types";
import { CustomPagination } from "../components/Pagination";

type HomeProps = {
   items: ItemType[];
   pageable: {
      currentPage: number,
      totalPages: number
   }
}

export default function HomePerPage({ items, pageable }: HomeProps) {
   const { category, superUser } = useContext(MainContext);
   return (
      <div className={styles.container}>
         <Head>
            <title>Abalone</title>
         </Head>

         <main className={styles.homePage}>
            <section>
               {superUser && <a href="/admin/cadastrar">Cadastrar novo produto</a>}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { params } = context
   const { page } = params
   const { data } = await api.get(`buscar?page=${Number(page) - 1}`);
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
   }
}