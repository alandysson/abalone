import { useContext, useState } from "react";
import { GetStaticPaths, GetStaticProps } from 'next'
import { api } from '../services/api'
import MainContext from "../context/MainContext";

import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import { deletarProduto } from "../services/utils";

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './home.module.scss';
import { Modal, Button, Pagination } from "react-bootstrap";

type Item = {
   id: number,
   nome: string,
   // thumbnail: string,
   categoria: string,
   valor: number,
   qtd: number,
}

type Page = {
   first: boolean;
   last: boolean;
   totalPages: number;
   number: number;
}

type HomeProps = {
   items: Item[];
   page: Page;
}

export default function Home({ items, page }: HomeProps) {
   const { addCart, category } = useContext(MainContext);
   const [show, setShow] = useState(false);
   const [id, setId] = useState(null);

   function renderItem(item) {
      return (
         <li key={item.id}>
            <div className={styles.buttons}>
               <Link href={`/produto/${item.id}`}>
                  <button>Editar</button>
               </Link>
               <button onClick={() => {
                  setShow(true);
                  setId(item.id);
               }}
               >
                  Excluir
               </button>
            </div>
            <span>
               <Image
                  width={120}
                  height={120}
                  src="/logo-navbar.png"
                  alt={item.title}
                  objectFit="cover"
               />
            </span>
            <div className={styles.itemDetails}>
               <h3>{item.nome}</h3>
               <p>Preço: R${String(item.valor)}</p>
               <button onClick={() => addCart(item)}>Adicionar ao pedido</button>
            </div>
         </li>
      );
   }

   const handleClose = () => setShow(false);

   return (
      <div className={styles.container}>
         <Head>
            <title>Abalone</title>
         </Head>

         <main className={styles.homePage}>
            <section>
               <a href="/admin/cadastrar">Cadastrar novo produto</a>
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
            {/* <Pagination className="pagination">
               <Pagination.First onClick={(e) => requestData(e, buscar, 1)} />
               <Pagination.Prev
                  disabled={page.current === 1 ? true : false}
                  onClick={(e) => {
                     requestData(e, page.current - 1)
                     window.scroll(0, 0)
                  }}
               />
               {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
               {page.current >= 2 ? (
                  <Pagination.Item
                     onClick={(e) => {
                        requestData(e, page.current - 1)
                        window.scroll(0, 0)
                     }}
                  >
                     {page.current - 1}
                  </Pagination.Item>
               ) : null}
               <Pagination.Item active>{page.current}</Pagination.Item>
               {page.total - page.current >= 1 ? (
                  <Pagination.Item
                     onClick={(e) => {
                        requestData(e, page.current + 1)
                        window.scroll(0, 0)
                     }}
                  >
                     {page.current + 1}
                  </Pagination.Item>
               ) : null}
               {page.total - page.current >= 2 ? (
                  <Pagination.Ellipsis disabled={true} />
               ) : null}
               <Pagination.Next
                  disabled={page.current === page.total ? true : false}
                  onClick={(e) => {
                     requestData(e, page.current + 1)
                     window.scroll(0, 0)
                  }}
               />
               <Pagination.Last
                  onClick={(e) => {
                     requestData(e, page.total)
                     window.scroll(0, 0)
                  }}
               />
            </Pagination> */}
         </main>

         <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Warning !</Modal.Title>
            </Modal.Header>
            <Modal.Body>Você deseja excluir o produto?!</Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleClose}>
                  Não
               </Button>
               <Button variant="danger" onClick={() => deletarProduto(id)}>
                  Excluir
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   )
}

export const getStaticPaths: GetStaticPaths = async () => {
   const { data } = await api.get("buscar");

   const paths = data.content.map(episode => {
      return {
         params: {
            slug: episode.nome
         }
      }
   })

   return {
      paths,
      fallback: 'blocking'
   }
}


export const getStaticProps: GetStaticProps = async () => {
   const { data } = await api.get("buscar?page=1");

   const items = data.content.map(item => {
      return {
         id: item.id,
         nome: item.nome,
         // thumbnail: item.thumbnail,
         categoria: item.categoria,
         valor: item.valor,
         qtd: item.qtd
      }
   })

   const page = {
      first: data.first,
      last: data.last,
      totalPages: data.totalPages,
      current: data.number,
   };

   return {
      props: {
         items,
         page
      },
      revalidate: 60 * 60 * 8,
   }
}