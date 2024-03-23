import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'; // Certifique-se de que o caminho está correto

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (const product of all_product) {
    cart[product.id] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItem, setCartItems] = useState(getDefaultCart());

  
  const addToCart = (userId, itemId) => {
    // Verifica se o ID do usuário e do item são válidos
  
    // Cria uma cópia do estado atual do carrinho
    const updatedCart = { ...cartItem };
  
    // Verifica se o item já está no carrinho
    if (updatedCart[itemId] !== undefined) {
      // Se o item já estiver no carrinho, aumenta a quantidade
      updatedCart[itemId] += 1;
    } else {
      // Se o item não estiver no carrinho, adiciona com a quantidade 1
      updatedCart[itemId] = 1;
    }
  
    // Atualiza o estado do carrinho com a cópia atualizada
    setCartItems(updatedCart);
  
    // Aqui você pode enviar os dados do carrinho para o servidor, incluindo o ID do usuário
    // Exemplo de como enviar os dados para o servidor:
    // fetch('/api/addToCart', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ userId, itemId }),
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Erro ao adicionar item ao carrinho:', error));
  
    alert('Item adicionado ao carrinho!');
  };
  
  const getToTalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItem) {
      if (cartItem.hasOwnProperty(itemId) && cartItem[itemId] > 0) {
        // Verifica se o ID do item é um número válido
        const itemIdNumber = Number(itemId);
        if (isNaN(itemIdNumber)) {
          console.error(`ID do item inválido: ${itemId}`);
          continue;
        }

        // Procura o item na lista de produtos pelo ID
        const itemInfo = all_product.find((product) => product.id === itemIdNumber);
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItem[itemId];
        } else {
          console.warn(`Produto com ID ${itemId} no carrinho não encontrado na lista de produtos.`);
        }
      }
    }

    return totalAmount;
  };

  const getToTalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const removeCartItem = (itemId) => {
    if (cartItem[itemId] > 0) {
      setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const contextValue = { all_product, cartItem, addToCart, removeCartItem, getToTalCartAmount, getToTalCartItems };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
