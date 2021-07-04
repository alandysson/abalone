import { api } from "../../services/api";
import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/pages/admin/cadastrar.module.scss";

type Produto = {
   nome: string,
   thumbnail: string;
   categoria: string;
   valor: number;
   qtd: number;
}

type CadastrarProps = {
   produto: Produto[];
}

export default function Cadastrar({ }: CadastrarProps) {
   const [produto, setProduto] = useState({});

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
         console.log(response);
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className={styles.cadastrarContainer}>
         <form onSubmit={handleSubmit}>
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
                  required
               />
            </Form.Group>

            <button type="submit">
               Cadastrar
            </button>
         </form>

         {/* {closeModal && (
               <Modal centered show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>Erro !</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>As senhas precisam ser iguais!</Modal.Body>
                  <Modal.Footer>
                     <Button variant="info" onClick={handleClose}>
                        Fechar
                     </Button>
                  </Modal.Footer>
               </Modal>
            )} */}
      </div>
   );
}