import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import Head from "next/head";
import { useContext, useState } from "react";
import { MessageAlert } from "../../components/Toast";
import Image from "next/image";
import MainContext from "../../context/MainContext";
import styles from "../../styles/pages/produto/produto.module.scss";
import { ItemType } from "../../types";

type ItemProps = {
   item: ItemType
}

export default function Produto({ item }: ItemProps) {
   const [appearAlert, setAppearAlert] = useState(false);
   const [message, setMessage] = useState(null);
   const { addCart } = useContext(MainContext);
   console.log(item)
   return (
      <div className={styles.produtoContainer}>
         <Head>
            <title>{item.nome} | Abalone </title>
         </Head>
         <form>
            <h2>{item.nome}</h2>
            <span>
               <Image
                  width={300}
                  height={300}
                  src="/logo-navbar.png"
                  alt={item.nome}
                  objectFit="cover"
               />
            </span>
            {/* TODO: refactor AddCart function or create a new function to add items to order */}
            <p>Quantidade disponível: {item.qtd}</p>
            <button disabled={item.qtd <= 0} onClick={(event) => {
               event.preventDefault()
               addCart(item)
               setAppearAlert(true)
               setMessage('Item adicionado ao carrinho!')
            }}>
               Adicionar ao carrinho
            </button>
         </form>
         {appearAlert &&
            <MessageAlert
               show={appearAlert}
               Message={message}
            />
         }
      </div>
   );
}

export const getStaticPaths: GetStaticPaths = async () => {
   const { data } = await api.get("buscar");

   const paths = data.content.map(item => {
      return {
         params: {
            slug: item.nome
         }
      }
   })

   return {
      paths,
      fallback: 'blocking'
   }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
   const { slug } = ctx.params;

   const { data } = await api.get(`/produto/${slug}`);

   const item = {
      id: data.id,
      nome: data.nome,
      // thumbnail: item.thumbnail,
      categoria: data.categoria,
      valor: data.valor,
      qtd: data.qtd
   }

   return {
      props: {
         item
      },
      revalidate: 60 * 60 * 24,
   }
}