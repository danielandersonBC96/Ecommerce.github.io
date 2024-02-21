import React from 'react';
import "./ProductDisplay.css";
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png'
import cart_icon from '../Assets/cart_icon.png'
import { DescriptionBox } from '../DesscriptionBox/DescriptionBox';
export const ProductDisplay = (props) => {
    const { product } = props;
    console.log( product)
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
             
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img ' src={product.image} alt=''/> 
                   
                </div>
                

               

             
            </div>
        
            <div className="productdisplay-right">
               

                 <div className='title-displayproduto'>
                 <h1>{product.name}</h1>
                 </div>
                
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                       old price: ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        new price: ${product.new_price}
                    </div>
                   
                    <div className="productdisplay-right-star">
                    Assessment:
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_dull_icon} alt=''/>
            
                </div>
                </div>
                <div className="productdisplay-right-description">


                  <p> Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, libero officiis! Iste quas dolor dolorem adipisci perspiciatis aliquid delectus eveniet reprehenderit repellendus laudantium optio velit suscipit, ipsam est nobis a.</p>
                </div>

        
                <div className="productdisplay-right-size">
                   
                <p className='productdisplay-right-category'>Category : <span> {product.category}</span>
              
              </p>
                </div>
                
               
                <button className='buttondisplay'>Add to cart   <br/>   <img className='carticon' src={ cart_icon} alt=''/>   </button>
           
                <DescriptionBox/>
            </div> 
          
   
        </div>
    );
    }