import React from 'react';
import  './Hero.css';
import arow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';


export const Hero = () => {
  return (
    <div className='hero ' >  
      <div className="hero-left">
        <h2> NEEWS ARRIVALS ONLY </h2>
        <div>
          <div className="hand-han-icon">
            <p> new </p>
          

          </div>
          <p> collection </p>
          <p>for everyone </p>
        </div>
         <div className="hero-latest-btn">
          <div>Latest Collection </div>
           <img src={ arow_icon } alt=''/>
         </div>

      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />

      </div>
    </div>
  )
}
