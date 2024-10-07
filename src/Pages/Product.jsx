import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Breadcrums } from '../Components/Breadcrums/Breadcrums';
import{useParams} from  'react-router-dom';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../Components/DesscriptionBox/DescriptionBox';

export const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  console.log(productId)
   //Encontrando o produto com base no ID
    const product = all_product.find((e) => e.id === parseInt(productId));

    // Verificando se o produto existe
  //if (!product) {
    //return <div>Produto não encontrado.</div>;
 // }

 return (
  <div>
    <Breadcrums product={product}/> 
    <ProductDisplay product={product}/>
    <DescriptionBox/>
 
  </div>
);

};