import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const UserPage = () => {
  const { all_product } = useContext(ShopContext);
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    // Obtém o email do usuário atual (substitua esta lógica com a maneira correta de obter o email do usuário)
    const currentUserEmail = 'progamin@example.com';

    // Busca as compras do usuário no localStorage usando o email como chave
    const purchases = JSON.parse(localStorage.getItem(currentUserEmail)) || [];

    // Atualiza o estado com as compras do usuário
    setUserPurchases(purchases);
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <div>
      <h2>Minhas Compras</h2>
      {userPurchases.map((purchase, index) => (
        <div key={index}>
          <p>Compra {index + 1}:</p>
          <p>Total: R$ {purchase.totalAmount.toFixed(2)}</p>
          <ul>
            {purchase.items.map((item, itemIndex) => {
              const product = all_product.find(product => product.id === item.id);
              return (
                <li key={itemIndex}>
                  {product.name} - Quantidade: {item.quantity}
                </li>
              );
            })}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UserPage;
