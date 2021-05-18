import {createContext, useState} from "react";

const MainContext = createContext({});

export const MainProvider = ({children}) => {
    const [items, setItems] = useState([]);

    function cart(value){
        setItems(value);
    }

    return(
        <MainContext.Provider   value={cart}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;