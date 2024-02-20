import React  from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png'
import cart_icon from '../Assets/cart_icon.png'

export const Item = (props) => {
  return (
      
              <div className='item' >
                
                <Link to={`/product/${props.id}`}>  <img src={props.image} alt=''/> </Link>
                <p>{props.name}</p> 
              
                  <div className='items-prices'>

                 
                      <div className='item-price-new'>  
                      <div className=" productdisplay-right-star">
                    Assessment: 
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_dull_icon} alt=''/>
            
                </div>               
                           New price:  ${props.new_price}
                           <div className="productdisplay-right-star">
                
                      </div>
                      
                      <div className='item-price-old'>
                             ${ props.old_price}     
                           
                      </div>  
             
                   
                       <div>
                       <Link to={`/product/${props.id}`}> <button className='button-item'>Check now </button> </Link>
                       </div>
                  </div>     
                  </div>  
              </div>
       
        )
  
}




