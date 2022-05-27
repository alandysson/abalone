import { createContext, useState, ReactNode, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

type Item = {
   id: number,
   nome: string,
   // thumbnail: string,
   categoria: string,
   valor: number
   qtd: number
}

type ContextProps = {
   category: string;
   superUser: string;
   addCart: (value) => void;
   adicionarMais: (value) => void;
   removeProduto: (value, id) => void;
   filterCategory: (value) => void;
   totalProduct: number;
   totalValue: number;
   item: Item[];
}

type MainContextProviderProps = {
   children: ReactNode;
}

const MainContext = createContext({} as ContextProps);

export const MainProvider = ({ children }: MainContextProviderProps) => {
   const [item, setItem] = useState([]);
   const [totalProduct, setTotalProduct] = useState(0);
   const [totalValue, setTotalValue] = useState(0);
   const [category, setCategory] = useState("");
   const [superUser, setSuperUser] = useState<string>(null)

   useEffect(() => {
      const storageUser = async () => {
         const dadosUser = await JSON.parse(localStorage.getItem("state"));
         if (dadosUser) {
            setSuperUser(dadosUser);
         }
      }
      storageUser()
   }, [])
   async function addCart(value: Item) {
      value.qtd = 0;
      value.qtd = value.qtd + 1
      setTotalValue(totalValue + value.valor);
      setItem(oldArray => [...oldArray, value]);
      setTotalProduct(totalProduct + 1);
   }


   function filterCategory(event) {
      setCategory(event.target.value);
   }

   async function adicionarMais(value: Item) {
      value.qtd = value.qtd + 1
      setTotalValue(totalValue + value.valor);
      setTotalProduct(totalProduct + 1);
   }

   function removeProduto(value: Item, id) {
      value.qtd = value.qtd - 1
      setTotalValue(totalValue - value.valor);
      setTotalProduct(totalProduct - 1);

      if (value.id === id) {
         const remover = totalItems.splice(totalItems.indexOf([value], 1))
      }
   }

   const totalItems = [...item];


   function removeDuplicado() {
      for (var i = 0; i <= totalItems.length; i++) {
         var qtdItems = [];
         var elemento = totalItems[i];
         var index = totalItems.indexOf(elemento);
         while (index != -1) {
            qtdItems.push(index);
            index = totalItems.indexOf(elemento, index + 1);
         }

         if (qtdItems.length > 1) {
            totalItems.splice(totalItems.indexOf(totalItems[i]), 1);
         }
      }
   }

   removeDuplicado();

   return (
      <MainContext.Provider value={{
         addCart,
         adicionarMais,
         category,
         filterCategory,
         totalProduct,
         item,
         totalValue,
         removeProduto,
         superUser
      }}>
         {children}
      </MainContext.Provider>
   )
}

export default MainContext;