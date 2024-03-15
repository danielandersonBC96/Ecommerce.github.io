import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const UserPage = () => {
  const { getToTalCartAmount, all_product, cartItem, removeCartItem } = useContext(ShopContext);

  return (
    <div>
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
          {all_product.map((product) => {
            if (cartItem[product.id] > 0) {
              return (
                <tr className="cartitems-row" key={product.id}>
                  <td><img src={product.image} className="carticon-product-icon" alt="product" /></td>
                  <td>{product.name}</td>
                  <td>{product.new_price}</td>
                  <td>{cartItem[product.id]}</td>
                  <td><img src={remove_icon} onClick={() => removeCartItem(product.id)} alt="remove" className="remove-icon" /></td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div className="cartitems-total-item">
            <p>SubTotal</p>
            <p>${getToTalCartAmount()}</p>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total : </h3>
              <h3>${getToTalCartAmount()}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
