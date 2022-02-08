import axios from "axios";
import { useState } from "react";
import { Form, Toast } from "react-bootstrap";
import styles from "../../styles/pages/admin/cadastrar.module.scss";
import Head from "next/head";
import { ItemType } from "../../types";

type CadastrarProps = {
   produto: ItemType[];
}

export default function Cadastrar({ }: CadastrarProps) {
   const [produto, setProduto] = useState({});
   const [showA, setShowA] = useState(false);
   const [message, setMessage] = useState(null);

   const toggleShowA = () => setShowA(!showA);

   const handleChange = (e) => {
      setProduto({ ...produto, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(produto);

      try {
         const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/cadastrar',
            data: produto
         })
         if (response.status == 201) {
            setShowA(true);
            setMessage("Produto cadastrado com sucesso!")
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
            <title>Cadastrar Produto</title>
         </Head>
         <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
               <Form.Label>Nome: </Form.Label>
               <Form.Control
                  name="nome"
                  type="text"
                  onChange={handleChange}
                  required
               />
            </Form.Group>

            {/* <Form.Group controlId="thumbnail">
               <Form.Label>Imagem do produto: </Form.Label>
               <input
                  name="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
               />
            </Form.Group> */}

            <Form.Group controlId="categoria">
               <Form.Label>Categoria: </Form.Label>
               <Form.Control
                  name="categoria"
                  type="text"
                  onChange={handleChange}
                  required
               />
            </Form.Group>
            <Form.Group controlId="valor">
               <Form.Label>Valor por produto: </Form.Label>
               <Form.Control
                  name="valor"
                  type="number"
                  onChange={handleChange}
                  required
               />
            </Form.Group>
            <Form.Group controlId="qtd">
               <Form.Label>Quantidade: </Form.Label>
               <Form.Control
                  name="qtd"
                  type="number"
                  onChange={handleChange}

               />
            </Form.Group>

            <button type="submit">
               Cadastrar
            </button>

            <Toast
               show={showA}
               onClose={toggleShowA}
               style={{
                  position: 'absolute',
                  top: 5,
                  right: 50,
               }}
            >
               <Toast.Header>
                  <img
                     className="rounded mr-2"
                     alt=""
                  />
                  <strong className="mr-auto">Abalone </strong>
               </Toast.Header>
               <Toast.Body>{message}</Toast.Body>
            </Toast>
         </Form>
      </div>
   );
}