import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import { Form } from "react-bootstrap";
import Head from "next/head";
import styles from "../../styles/pages/admin/cadastrar.module.scss";
import axios from "axios";
import { useState } from "react";
import { ItemType } from "../../types";
import { MessageAlert } from "../../components/Toast";

type ItemProps = {
   item: ItemType
}

export default function Produto({ item }: ItemProps) {
   const [produto, setProduto] = useState<ItemType>(item);
   const [appearAlert, setAppearAlert] = useState<boolean>(false);
   const [message, setMessage] = useState(null);

   const handleChange = (e) => {
      setProduto({ ...produto, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setAppearAlert(false);
      try {
         const response = await axios({
            method: 'put',
            url: `http://localhost:8080/api/alterar/${item.id}`,
            data: produto
         })
         setAppearAlert(true);
         if (response.status == 200) {
            setMessage("Dados do produto alterado com sucesso!")
         } else {
            setMessage("Algo deu errado, tente novamente!")
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className={styles.cadastrarContainer}>
         <Head>
            <title>{item.nome} | Abalone </title>
         </Head>
         <form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
               <Form.Label>Nome: </Form.Label>
               <Form.Control
                  name="nome"
                  type="text"
                  onChange={handleChange}
                  defaultValue={item.nome}
                  required
               />
            </Form.Group>

            {/* <Form.Group controlId="thumbnail">
              <Form.Label>Imagem do produto: </Form.Label>
              <input
                 name="thumbnail"
                 type="file"
                 onChange={handleChange}
              />
           </Form.Group> */}

            <Form.Group controlId="categoria">
               <Form.Label>Categoria: </Form.Label>
               <Form.Control
                  name="categoria"
                  type="text"
                  onChange={handleChange}
                  defaultValue={item.categoria}
                  required
               />
            </Form.Group>

            <Form.Group controlId="valor">
               <Form.Label>Valor por produto: </Form.Label>
               <Form.Control
                  name="valor"
                  type="number"
                  onChange={handleChange}
                  defaultValue={item.valor}
                  required
               />
            </Form.Group>

            <Form.Group controlId="qtd">
               <Form.Label>Quantidade: </Form.Label>
               <Form.Control
                  name="qtd"
                  type="number"
                  defaultValue={item.qtd}
                  onChange={handleChange}
                  required
               />
            </Form.Group>

            <button type="submit">
               Editar
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
   const { data } = await api.get("buscar", {
      params: {
         _limit: 2,
         _sort: 'published_at',
         _order: 'desc'
      }
   });

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