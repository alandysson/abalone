import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
               <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;1,300&display=swap" rel="stylesheet" />
               <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}