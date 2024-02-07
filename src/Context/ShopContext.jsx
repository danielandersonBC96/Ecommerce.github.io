import React, { createContext } from "react";
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    // Corrigido o nome da variável para 'contextValue'
    const contextValue = { all_product }; // Atribuído 'all_product' a 'contextValue'

    return (
        <ShopContext.Provider value={contextValue}>
            {/* Corrigido o nome da propriedade 'children' */}
            {props.children} 
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
