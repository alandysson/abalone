import { useContext, useState } from "react";
import { GetStaticProps } from 'next'
import { api } from '../services/api'
import MainContext from "../context/MainContext";

import Head from 'next/head'
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './home.module.scss';
import { Modal, Button } from "react-bootstrap";


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
   const [show, setShow] = useState(false);
   const [id, setId] = useState(null);

   async function deletarProduto(id){
      console.log(id)
      try{
         const response = await axios({
            method: 'delete',
            url: `http://localhost:8080/api/excluir/${id}`
         })

         console.log(response)
         if(response.status == 204){
            window.location.reload();
         }
      } catch(error){
         console.log(error);
      }
   }

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
         </main>
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   const { data } = await api.get("buscar", {
      params: {
         _limit: 11,
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