import React from 'react'

import '../Css/login.css'

export const LoginSignup = () => {
  return (
     <div className="loginsignup">
       <div className="loginsignup-container">
        <h1>Sign Up</h1>
             <div className="loginsignup-fields">
                <input type='text' placeholder='Your Name'/>
                <input type="email" placeholder='Email Addres'/>
                <input type='password' placeholder=' Password'/>
             </div>
             <button>Continue</button>
        </div>
        <p className='loginsignup-login'> 
        Already have an account?  <span> Login </span> 
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
            
        </div>
     </div>
  )
}
