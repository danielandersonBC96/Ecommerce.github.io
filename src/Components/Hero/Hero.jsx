import React from 'react';
import  './Hero.css';
import arow_icon from '../Assets/arrow.png';
import motor_buffalo from '../Assets/26.png';


export const Hero = () => {
  return (
    <div className='hero ' >  
      <div className="hero-left">
        <h2>  Tudo novo: descubra as últimas novidades agora   </h2>
        <div>
          <div className="hand-han-icon">
       
          </div>
          <p> 
            
          Nova coleção: Para todos os estilos. 
             </p>
        </div>
     

      </div>
      <div className="hero-right">
        <img src={motor_buffalo} className='motor-logo' alt="" />

      </div>
    </div>
  )
}
