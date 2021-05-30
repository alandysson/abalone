import Menu from '../components/Menu'
import Head from "next/head";
import Navbar from '../components/Navbar'
import { MainProvider } from '../context/MainContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
   return (
      <MainProvider>
         <Head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;1,300&display=swap" rel="stylesheet" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
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
