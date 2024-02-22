import React, { useState }   from 'react';
import './Related.css'
import data_product from '../Assets/data';
import {Item } from '../Items/item';
import all_product from '../Assets/all_product';

export const RelatedProducts = () => {

  const [products, setProducts] = useState( data_product);

  const shuffleProducts = () => {
    // Embaralha os produtos aleatoriamente
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
    setProducts(shuffledProducts);
  };

  return (
    <div className='relatedproducts'>
        <h1> Telated Products </h1>
        <hr/>
        <div className="relatedproducts-item">
          {data_product.map((item,i) => {
            return <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            onClick={shuffleProducts}
            
            />
          } )}
        </div>
    </div>
  )
}