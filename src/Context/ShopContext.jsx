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
  const [user,setUser] = useState(null)

  const addToCart = (userId, itemId) => {
    if (userId) {
      // Adiciona o produto ao carrinho com o ID do usuário
      setCartItems(prevCartItems => ({ ...prevCartItems, [itemId]: prevCartItems[itemId] + 1, userId: userId }));
      // Exibe um alerta indicando que o item foi adicionado ao carrinho
      alert('Item adicionado ao carrinho!');
    } else {
      // Exibe um alerta informando que o usuário precisa fazer login para adicionar itens ao carrinho
      alert('Faça login para adicionar itens ao carrinho.');
    }
  };
  
  //Logica do carrinho 
  const getToTalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItem) {
        if (cartItem[item] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            totalAmount += itemInfo.new_price * cartItem[item];
        }
    }

    return totalAmount;
}
//Notificação do Carrinho 

const  getToTalCartItems = () => {
  let totalItem = 0;

  for (const item in cartItem) {
    if (cartItem[item] > 0) {
      totalItem += cartItem[item]; // Adicionando a quantidade de cada item ao totalItem
    }
  }

  return totalItem;
}

  const removeCartItem = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }

  // Definindo o valor do contexto
  const contextValue = {   getToTalCartItems,getToTalCartAmount ,all_product, cartItem, addToCart, removeCartItem };

  return (
    <ShopContext.Provider value={contextValue}>
      {/* Corrigido o nome da propriedade 'children' */}
      {props.children} 
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
