import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import { MainProvider } from '../context/MainContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
   return (
      <MainProvider>
         <div>
            <main>
               <Navbar />
               <Menu />
               <div style={{ background: "ghostwhite", minHeight: "100vh" }}>
                  <Component {...pageProps} />
               </div>
            </main>
         </div>
      </MainProvider>
   )
}

export default MyApp
