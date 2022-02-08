import styles from "../../styles/pages/admin/login.module.scss";
import { useState } from "react";
import axios from "axios";

type User = {
   email: string;
   password: string
}

export default function Login({ }: User) {
   const [user, setUser] = useState<User>();

   const handleSubmit = async (event) => {
      event.preventDefault()
      try {
         const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/login',
            data: user
         })
         console.log(response)
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
               required
               onChange={handleChange}
            />
            <label>Senha</label>
            <input
               id="password"
               type="password"
               required
               onChange={handleChange}
            />
            <div className={styles.buttonRow}>
               <button type="submit">Entrar</button>
            </div>
         </form>
      </div>
   )
}