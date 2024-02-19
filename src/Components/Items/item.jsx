import React  from 'react'
import './Item.css'
import { Link } from 'react-router-dom'


export const Item = (props) => {
  return (
      
              <div className='item' >
                
                <Link to={`/product${props.id}`}>  <img src={props.image} alt=''/> </Link>
                <p>{props.name}</p> 
              
                  <div className='items-prices'>
                      <div className='item-price-new'>                     
                             ${props.new_price}
                      </div>
                      <div className='item-price-old'>
                             ${ props.old_price}     
                           
                      </div>  

                   
                       <div>
                       <Link to={`/product/${props.id}`}> <button className='button-item'>Check now </button> </Link>
                       </div>
                  </div>       
              </div>
       
        )
  
}




