import React, { useState } from 'react';
import  "../Navbar/Navbar.css";
import logo_big from '../Assets/logo_big.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';


export const NavBar = () => {
  
  const[ menu, setMenu ] = useState( ' shop')
  
  return (

    <div className='navbar'>

          <div className='nav-log'>

             <img src={logo_big} alt=''/>
             <p>SHOPPER</p>
              
          </div>

         <ul className='nav-menu'> 

           <li onClick={() =>{setMenu("shop")}}> <Link to='/' style={{ textDecoration: 'none '}}> Shop </Link>{ menu === "shop"?<h/> : <></> }</li>
           <li onClick={() =>{setMenu('mens')} }> <Link to='/mens ' style={{ textDecoration: 'none '}}> Mens </Link>{ menu === "mens"?<h/> : <></> }   </li>
           <li onClick={() =>{setMenu('womens')}}> <Link to='/womens ' style={{ textDecoration: 'none '}} > womens</Link>{ menu === "womens"?<h/> : <></> }  </li>
           <li onClick={() =>{setMenu('kids')}} >  <Link to='/kids' style={{ textDecoration: 'none '}}> Kids  </Link> { menu === " kids"?<h/> : <></> }   </li>
        
         </ul>
         
         <div className='nav-login-cart'>  
             
                 <Link to='/login'> 
                   <button> Login </button>   
                 </Link> 

                 <Link>  
                   
                   <div className='cart'>
                        <img src={ cart_icon} alt=''/>
                   </div>
                 </Link>

              <div className='nav-cart-count'>0</div>

         </div>
   
     </div>
     
  )
}
