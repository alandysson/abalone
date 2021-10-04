import Link from "next/link";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MainContext from "../../context/MainContext";
import { deletarProduto } from "../../services/utils";
import styles from './styles.module.scss';

export function Item({ props }) {
   const { addCart } = useContext(MainContext);

   const [show, setShow] = useState(false);
   const [id, setId] = useState(null);

   const handleClose = () => setShow(false);

   return (
      <div>
         <li key={props.id}>
            <div className={styles.buttons}>
               <Link href={`admin/${props.id}`}>
                  <button>Editar</button>
               </Link>
               <button onClick={() => {
                  setShow(true);
                  setId(props.id);
               }}
               >
                  Excluir
               </button>
            </div>
            <div className={styles.itemDetails}>
               <Link href={`produto/${props.id}`}>
                  <span>
                     <Image
                        width={120}
                        height={120}
                        src="/logo-navbar.png"
                        alt={props.title}
                        objectFit="cover"
                     />
                  </span>
               </Link>
               <h3>{props.nome}</h3>
               <p>Preço: R${String(props.valor)}</p>
               <button onClick={() => addCart(props)}>Adicionar ao pedido</button>
            </div>
         </li>

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