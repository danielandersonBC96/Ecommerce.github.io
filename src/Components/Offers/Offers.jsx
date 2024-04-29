import React from 'react';
import './Offers.css';
import  product from '../Assets/carabina.png'


export const Offers = () => {
  return (
    <div className='Offers'>
       <div className="Offers-left">
       
        <h1>  Exclusivo</h1>
 
<p> OFERTAS SOMENTE NOS PRODUTOS MAIS VENDEDOS </p>
        <button> Check Now </button>
       </div>
       <div className="offers-right">
     
       <img className='carabina'src={ product } alt=''/>

       </div>
    </div>
  )
}
