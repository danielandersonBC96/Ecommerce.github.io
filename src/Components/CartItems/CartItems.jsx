import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'
import "./Cartitems.css"

export const CartItems = () => {

    const { all_product, cartItem, removeCartItem } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <h1> Cart Items</h1>
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
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals </h1>
                    <div>
                        <div className="cartitems-total-item"> 

                             <p>SubTotal</p>
                             <p> ${0}</p>

                             <hr/>

                            <div className="caritems-total-item">

                                <p> Shipping Fee </p>
                                <p>Free</p>

                            </div>         
                            <hr/> 
                             <div className="cartitems-total-item">

                                <h3>Total</h3>
                                <h3>${0}</h3>
                                
                             </div>    
                             <button className='checkout'> Checkout </button>      
                        </div>
                       
                    </div>
                    <div className="cartitems-promocode">
      <div className="cartitems-promobox">
        <div className="left-content">
          <p>Se você tem um código promocional, insira-o aqui:</p>
         
        </div>
         <div>
         <input type="text" placeholder="Código promocional" />
         </div>
        <div className="right-content">
      
          <button className="submit">Enviar</button>
        </div>
      </div>
    </div>

                </div>
            </div>
        </div>
    );
}