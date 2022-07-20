import styles from "../../styles/pages/admin/login.module.scss";
import { useState } from "react";
import axios from "axios";
import { MessageAlert } from "../../components/Toast"

type User = {
   email: string;
   password: string
}

export default function Login() {
   const [user, setUser] = useState<User>();
   const [appearAlert, setAppearAlert] = useState<boolean>(false)
   const [message, setMessage] = useState<string>(null)

   const handleSubmit = async (event) => {
      event.preventDefault()
      setAppearAlert(false)
      try {
         const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/login',
            data: user
         })
         if (response.status === 204) {
            setAppearAlert(true)
            setMessage("Senha ou e-mail inválido!")
         } else {
            localStorage.setItem("state", JSON.stringify(response.data))
            setAppearAlert(true)
            setMessage("Você está logado! Aguarde e será redirecionado")
         }
      } catch (error) {
         console.log(error)
      }
   }

   const handleChange = (event) => {
      setUser({ ...user, [event.target.id]: event.target.value.trim() })
   }

   return (
      <div className={styles.loginContainer}>
         <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
               id="email"
               type="email"
               data-testid="email"
               required
               onChange={handleChange}
            />
            <label>Senha</label>
            <input
               id="password"
               type="password"
               data-testid="password"
               required
               onChange={handleChange}
            />
            <div className={styles.buttonRow}>
               <button type="submit">Entrar</button>
            </div>
            {appearAlert &&
               <MessageAlert
                  Message={message}
                  show={appearAlert}
               />
            }
         </form>
      </div>
   )
}