import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'
import "./Cartitems.css"

export const CartItems = () => {

    const { all_product, cartItem, removeCartItem } = useContext(ShopContext);


    return (
        <div className='cartitems'>
            <table className="cartitems-table">
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {all_product.map((e) => {
                        if (cartItem[e.id] > 0) {
                            return (
                                <tr className="cartitems-row" key={e.id}>
                                    <td>
                                        <img src={e.image} className='carticon-product-icon' alt='product'/>
                                    </td>
                                    <td>{e.name}</td>
                                    <td>{e.new_price}</td>
                                    <td>{cartItem[e.id]}</td>
                                    <td>
                                        <img 
                                            src={remove_icon}  
                                            onClick={() => removeCartItem(e.id)} 
                                            alt='remove'
                                            className='remove-icon'
                                        />
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </div>
    );
    
    
        
        

}