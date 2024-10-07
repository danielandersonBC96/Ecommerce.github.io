import React, { useState } from 'react';
import "./related.css";
import data_product from '../Assets/data';
import { Item } from '../Items/item';

export const RelatedProducts = () => {
  const [products, setProducts] = useState(data_product);

  const shuffleProducts = () => {
    // Embaralha os produtos aleatoriamente
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
    setProducts(shuffledProducts);
  };

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-list"> {/* Alterado de relatedproducts-item para relatedproducts-list */}
        {products.map((item, i) => {
          return (
            <div className="relatedproducts-item" key={i}> {/* Adicionando a classe aqui */}
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                onClick={shuffleProducts}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
