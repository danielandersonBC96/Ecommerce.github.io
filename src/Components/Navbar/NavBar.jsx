import React, { useState } from 'react';
import  "../Navbar/Navbar.css";
import logo_big from '../Assets/logo_big.png'
import cart_icon from '../Assets/cart_icon.png'


export const NavBar = () => {
  
  const[ menu, setMenu ] = useState( ' shop')
  
  return (

    <div className='navbar'>

          <div className='nav-log'>

             <img src={logo_big} alt=''/>
             <p>SHOPPER</p>
              
          </div>

         <ul className='nav-menu'> 

           <li onClick={() =>{setMenu("shop")}}>Shop { menu === "shop"?<h/> : <></> }</li>
           <li onClick={() =>{setMenu('mens')} }>Mens { menu === "mens"?<h/> : <></> }   </li>
           <li onClick={() =>{setMenu('womens')}}>Womens  { menu === "womens"?<h/> : <></> }  </li>
           <li onClick={() =>{setMenu('kids')}} >  Kids { menu === " kids"?<h/> : <></> }   </li>
        
         </ul>
         
         <div className='nav-login-cart'>  
             
              <button> Login </button>
              <img src={ cart_icon} alt=''/>
              <div className='nav-cart-count'>0</div>

         </div>
   
     </div>
     
  )
}
