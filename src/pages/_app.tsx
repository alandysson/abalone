import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
   return (
      <div>
         <main>
            <Navbar />
            <Menu />
            <div style={{ background: "ghostwhite" }}>
               <Component {...pageProps} />
            </div>
         </main>
      </div>
   )
}

export default MyApp
