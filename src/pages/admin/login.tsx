import styles from "../../styles/pages/admin/login.module.scss";
import { Form } from "react-bootstrap";
import { useState } from "react";


export default function Login() {
   const [user, setUser] = useState(null);

   const handleSubmit = async (event) => {
      event.preventDefault()
      console.log(user)
   }

   const handleChange = (event) => {
      setUser({ ...user, [event.target.id]: event.target.value.trim() })
   }

   return (
      <div className={styles.loginContainer}>
         <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
               id="usr_email"
               type="email"
               onChange={handleChange}
            />
            <label>Senha</label>
            <input
               id="usr_pass"
               type="password"
               onChange={handleChange}
            />
            <div className={styles.buttonRow}>
               <button type="submit">Entrar</button>
            </div>
         </form>
      </div>
   )
}