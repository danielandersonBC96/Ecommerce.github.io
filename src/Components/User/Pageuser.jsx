import React, { useState, useEffect } from 'react';
import './Pageuser.css'

export const UserPage = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Suponha que você tenha o e-mail do usuário logado armazenado em uma variável currentUserEmail
    const currentUserEmail = 'progamin@example.com';
    
    // Recupere as compras do localStorage associadas ao usuário atual
    const purchaseData = localStorage.getItem(currentUserEmail);
    
    if (purchaseData) {
      try {
        // Parse das compras do localStorage para um array
        const purchasesFromLocalStorage = JSON.parse(purchaseData);
        // Adiciona a data da compra a cada objeto de compra
        const purchasesWithDate = purchasesFromLocalStorage.map(purchase => ({
          ...purchase,
          purchaseDate: formatPurchaseDate(purchase.purchaseDate)
        }));
        setPurchases(purchasesWithDate);
      } catch (error) {
        console.error('Erro ao analisar os dados do localStorage:', error);
      }
    } else {
      console.log('Nenhuma compra encontrada no localStorage para o usuário atual.');
    }
  }, []);

  const formatPurchaseDate = (purchaseDate) => {
    const today = new Date();
    const purchaseDateTime = new Date(purchaseDate);
    const diffTime = Math.abs(today - purchaseDateTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Hoje';
    } else if (diffDays === 1) {
      return 'Ontem';
    } else {
      return purchaseDateTime.toLocaleDateString();
    }
  };

  const handleOrderAgain = (purchaseIndex) => {
    // Clona a lista de compras
    const updatedPurchases = [...purchases];
    
    // Atualiza o status da compra para 'Pedido Novamente'
    updatedPurchases[purchaseIndex] = { ...updatedPurchases[purchaseIndex], status: 'Pedido Novamente' };
  
    // Define o estado com a nova lista de compras atualizada
    setPurchases(updatedPurchases);
  };

  return (
    <div className="centered-container">
 <h2> Compras do Usuário </h2>
      <div className="purchase-container">
        {purchases.map((purchase, index) => (
          <div key={index} className="purchase">
            <div className="purchase-items">
              <h3>Itens da Compra {index + 1}</h3>
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
            </div>
            <div className="purchase-details">
              <h3>Detalhes da Compra {index + 1}</h3>
              <p>Data da compra: {purchase.purchaseDate}</p>
              <p>Status da compra: {purchase.status}</p>
              <p className="total">Total: R$ {purchase.totalAmount ? purchase.totalAmount.toFixed(2) : ''}</p>
              {purchase.status !== 'Pedido Novamente' ? (
                <button onClick={() => handleOrderAgain(index)}>Pedir Novamente</button>
              ) : (
                <p>Status: Pedido Novamente</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};