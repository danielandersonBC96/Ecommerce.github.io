import React, { useState, useEffect } from 'react';
import './Pageuser.css'; // Importe seu arquivo CSS

export const UserPage = () => {
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    const currentUserEmail = 'progamin@example.com';
    const purchaseData = localStorage.getItem(currentUserEmail);
  
    if (purchaseData) {
      try {
        const purchases = JSON.parse(purchaseData);
        setUserPurchases(prevPurchases => {
          // Verifica se a compra já existe na lista antes de adicionar
          if (!prevPurchases.some(prevPurchase => prevPurchase.totalAmount === purchases.totalAmount)) {
            const purchaseWithInfo = {
              ...purchases,
              status: 'Concluída', // Define o status da compra como 'Concluída'
              purchaseDate: new Date().toISOString() // Adiciona a data da compra
            };
            return [...prevPurchases, purchaseWithInfo]; // Adiciona apenas se for uma nova compra
          }
          return prevPurchases;
        });
      } catch (error) {
        console.error('Erro ao analisar os dados do localStorage:', error);
      }
    } else {
      console.error('Dados de compra não encontrados no localStorage.');
    }
  }, []);
  
  const handleOrderAgain = (purchaseIndex) => {
    // Clona a lista de compras
    const updatedUserPurchases = [...userPurchases];
    
    // Atualiza o status da compra solicitada novamente
    updatedUserPurchases[purchaseIndex] = { ...updatedUserPurchases[purchaseIndex], status: 'Solicitada novamente' };
  
    // Define o estado com a nova lista de compras atualizada
    setUserPurchases(updatedUserPurchases);
  };

  return (
    <div className="purchase-container">
      {userPurchases.map((purchase, purchaseIndex) => (
        <PurchaseCard key={purchaseIndex} purchase={purchase} purchaseIndex={purchaseIndex} handleOrderAgain={handleOrderAgain} />
      ))}
    </div>
  );
};

const PurchaseCard = ({ purchase, purchaseIndex, handleOrderAgain }) => {
  return (
    <div className="purchase">
      <h3>Compra {purchaseIndex + 1}</h3>
      <p>Data da compra: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
      <p>Status da compra: {purchase.status}</p>
      <div className="table-responsive">
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Imagem</th>
            </tr>
          </thead>
          <tbody>
            {purchase.items && purchase.items.map((item, itemIndex) => (
              <tr key={itemIndex}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>R$ {item.new_price ? item.new_price.toFixed(2) : ''}</td>
                <td>{item.quantity}</td>
                <td><img src={item.image} alt={item.name} className="product-image" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="total">Total: R$ {purchase.totalAmount ? purchase.totalAmount.toFixed(2) : ''}</p>
      <button onClick={() => handleOrderAgain(purchaseIndex)}>Pedir Novamente</button>
    </div>
  );
};
