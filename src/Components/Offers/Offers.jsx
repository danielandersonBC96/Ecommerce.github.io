import React from 'react';
import './Offers.css';
import  product from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
    <div className='Offers'>
       <div className="Offers-left">
        <h1> Exclusive</h1>
        <h1> Offers For you </h1>
        <p> ONLY ON BEST SELLERS PRODUCTS</p>
        <button> Check Now </button>
       </div>
       <div className="offers-right">
     
       <img src={ product } alt=''/>

       </div>
    </div>
  )
}
