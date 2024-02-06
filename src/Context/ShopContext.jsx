import React, { createContext } from "react";
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext( null);

const ShopContextProvider = ( props ) => {


    const contexValue = { all_product}
  
    return(

        <ShopContext.Provider value={ contexValue}>

              { props.childer}

        </ShopContext.Provider>
    )
}

export default ShopContextProvider