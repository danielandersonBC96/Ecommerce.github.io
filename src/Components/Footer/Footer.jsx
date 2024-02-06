import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'

export const Footer = () => {
  return (
     <div className="footer">
        <div className="footer-logo">
           <img src={ footer_logo}alt=''/>
            <ul className="footer-links">
                <li>Company </li>
                <li> Products </li>
                <li> Officers </li>
                <li> About </li>
                <li> Contact </li>
            </ul>
           
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                   
                     <div className="footer-icons-container">
                         <img src={instagram_icon} alt=''/>
                     </div>
                     <div className="footer-icons-container">
                         <img src={pintester_icon} alt='' />
                     </div>
                     <div className="footer-icons-container">
                       <img src={ whatsapp} alt=''/>
                     </div>
                </div>
            </div>
           </div>

        
            <div className="footer-copyright">
           
           <p> Copyright @ 2023 - all right reserverd </p>
           <hr/>
          </div>

     </div>
    )
}
