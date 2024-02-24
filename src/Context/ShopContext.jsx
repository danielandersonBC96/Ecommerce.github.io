import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

// Criando lógica do Carrinho de Compras
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  // Corrigido o nome da variável para 'contextValue'
  const [cartItem, setCartItems] = useState(getDefaultCart());

  const addTaCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItem);

  }

  const removeCartItem = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }

  // Definindo o valor do contexto
  const contextValue = { all_product, cartItem, addTaCart, removeCartItem };

  return (
    <ShopContext.Provider value={contextValue}>
      {/* Corrigido o nome da propriedade 'children' */}
      {props.children} 
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
