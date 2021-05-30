import { createContext, useState, ReactNode } from "react";

type Item = {
   id: number,
   title: string,
   thumbnail: string,
   categoria: string,
   preco: number
   qtd: number
}

type ContextProps = {
   cart: (value) => void;
   totalProduct: number;
   totalItems: Item[];
}

type MainContextProviderProps = {
   children: ReactNode;
}

const MainContext = createContext({} as ContextProps);

export const MainProvider = ({ children }: MainContextProviderProps) => {
   const [item, setItem] = useState([]);
   const [totalProduct, setTotalProduct] = useState(0);

   function cart(value: Item) {
      value.qtd = value.qtd + 1
      setItem(oldArray => [...oldArray, value]);
      setTotalProduct(totalProduct + 1);
   }

   const totalItems = [...item];

   function removeDuplicado() {
      for (var i = 0; i <= totalItems.length; i++) {
         var indices = [];
         var elemento = totalItems[i];
         var index = totalItems.indexOf(elemento);
         while (index != -1) {
            indices.push(index);
            index = totalItems.indexOf(elemento, index + 1);
         }

         if (indices.length > 1) {
            totalItems.splice(totalItems.indexOf(totalItems[i]), 1);
         }
      }
   }

   removeDuplicado();

   return (
      <MainContext.Provider value={{ cart, totalProduct, totalItems }}>
         {children}
      </MainContext.Provider>
   )
}

export default MainContext;