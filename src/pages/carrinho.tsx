import { useContext, useState, useEffect } from "react";
import axios from "axios";
import emailjs from 'emailjs-com';
import Image from "next/image"
import styles from "../styles/pages/carrinho/styles.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { Form } from "react-bootstrap"

import MainContext from "../context/MainContext";

export function Carrinho() {
   const [dataUser, setDataUser] = useState({});
   const {
      item,
      totalProduct,
      totalValue,
      adicionarMais,
      removeProduto
   } = useContext(MainContext);

   const handleChange = (e) => {
      setDataUser({ ...dataUser, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log({ dataUser, item, totalValue })
      try {
         const response = await axios({
            method: 'put',
            url: `http://localhost:8080/api/cadastrarPedido`,
            data: { dataUser, item, totalValue }
         })
         console.log(response)
      } catch (error) {
         console.log(error)
      }
   }

   // function sendEmail(e) {
   //    e.preventDefault();

   //    emailjs.sendForm('service_w04lxvq', 'template_uk5wdod', e.target, 'user_qw8HHBa48xZmtNDRzsJKR')
   //       .then((result) => {
   //          console.log(result.text);
   //       }, (error) => {
   //          console.log(error.text);
   //       });
   // }

   return (
      <div className={styles.carrinhoContainer}>

         <section>
            <h1>Seu carrinho de compras</h1>
            <ul>
               {item.map(item => {
                  return (
                     <>
                        {item.qtd !== 0 ? (
                           <>
                              <li key={item.id}>
                                 <span>
                                    <Image
                                       width={120}
                                       height={120}
                                       src="/logo-navbar.png"
                                       objectFit="cover"
                                    />
                                 </span>

                                 <div className={styles.itemDescription}>
                                    <h3>{item.nome}</h3>
                                    <p>Total: R$ {String(item.valor * item.qtd)}</p>
                                    <div className={styles.adicionarMais}>
                                       <button>
                                          <AiOutlineMinus onClick={() => removeProduto(item, item.id)} />
                                       </button>
                                       <p>{item.qtd}</p>
                                       <button onClick={() => adicionarMais(item)}>
                                          <AiOutlinePlus />
                                       </button>
                                    </div>
                                 </div>
                              </li>
                           </>
                        ) : ""}
                     </>
                  )
               })}
               {totalValue === 0 ? "" : (
                  <li className={styles.total}>Total: R$ {totalValue}</li>
               )}
            </ul>
         </section>
         <div className={styles.formStyle}>
            <p>
               Preencha os campos e logo entraremos em contato
            </p>
            <form onSubmit={handleSubmit}>
               <Form.Group controlId="nome">
                  <Form.Label>Nome: </Form.Label>
                  <Form.Control
                     type="text"
                     name="contact_name"
                     placeholder="Digite seu nome"
                     onChange={handleChange}
                     required
                  />
               </Form.Group>
               <Form.Group controlId="contato">
                  <Form.Label>Contato: </Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Digite um numero para contato"
                     name="contact_number"
                     onChange={handleChange}
                     required
                  />
               </Form.Group>
               <button type="submit" value="Send">Enviar</button>
            </form>
         </div>
      </div>
   );
}

export default Carrinho;