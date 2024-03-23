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
        setUserPurchases([purchases]);
      } catch (error) {
        console.error('Erro ao analisar os dados do localStorage:', error);
      }
    } else {
      console.error('Dados de compra não encontrados no localStorage.');
    }
  }, []);

  return (
    <div className="purchase-container">
      {userPurchases.map((purchase, purchaseIndex) => (
        <div key={purchaseIndex} className="purchase">
          <h3>Compra {purchaseIndex + 1}</h3>
          <div className="table-responsive"> {/* Container para tornar a tabela responsiva */}
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
                {purchase.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>R$ {item.new_price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td><img src={item.image} alt={item.name} className="product-image" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="total">Total: R$ {purchase.totalAmount.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};
