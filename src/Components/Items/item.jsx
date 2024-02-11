import React  from 'react'
import './Item.css'
import { Link } from 'react-router-dom'


export const Item = (props) => {
  return (
      
              <div className='item' >
                
                <img src={props.image}/>
                <p>{props.name}</p> 
                  <div className='items-prices'>
                      <div className='item-price-new'>                     
                             ${props.new_price}
                      </div>
                      <div className='item-price-old'>
                             ${ props.old_price}     
                        
                      </div>  

                   <Link to={`/product${props.id}`}> <button>Check now </button> </Link>
                       
                  </div>       
              </div>
       
        )
  
}




