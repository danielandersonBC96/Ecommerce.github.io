import React, { useContext } from 'react';
import '../Css/ShopCategory.css';
import { ShopContext} from '../Context/ShopContext';

export const ShopCategory = (props) => {
  const {all_product } = useContext( ShopContext)
  return (
    <div className='shop-category'>
          
    <img src={props.banner} alt=''/>
    </div>
  )
}
