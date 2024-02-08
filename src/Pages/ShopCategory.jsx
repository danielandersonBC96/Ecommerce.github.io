import React  from 'react';
import '../Css/ShopCategory.css'
import { Item } from '../Components/Items/item';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'; // Certifique-se de que o caminho do seu ícone está correto
import all_product from '../Components/Assets/all_product';



export const ShopCategory = (props) => {
  
 return (
   <div className='shop-category'>
     <img src={props.banner} alt='' className='shopycategory-banner' />
     <div className="shopcategory-indexSort">
       <p>
         <span>Showing 1-12</span> out of 36 products
       </p>
       <div className="shopcategory-sort">
         Sort by <img src={dropdown_icon} alt='' />
       </div>
     </div>
     <div className="shopcategory-products">
       { all_product.map((item, i) => {
          return <Item
          key={i } 
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={ item.new_price}
          old_price={item.old_price}
          />
       })}
     </div>
   </div>
 );
};

















































































