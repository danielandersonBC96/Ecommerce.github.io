// Navbar.js
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import userIcon from '../Assets/png_user_icon.png';
import logoBig from '../Assets/logo_big.png';
import cartIcon from '../Assets/cart_icon.png';
import './Navbar.css';

export const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { getToTalCartItems } = useContext(ShopContext);
  const [menu, setMenu] = useState('shop'); // Estado para controlar o item do menu ativo

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const storedRememberMe = localStorage.getItem('storedRememberMe');
      setIsLoggedIn(storedRememberMe === 'true');
  
      if (storedRememberMe === 'true') {
        const storedEmail = localStorage.getItem('storedEmail');
        const user = getUserByEmail(storedEmail);
        if (user) {
          setUserName(user.name);
        }
      }
    };
  
    checkLoggedInStatus();
  }, []);

  const getUserByEmail = (email) => {
    const users = [
      { email: 'progamin@example.com', password: 'userpassword', userType: 'user', id: '1', name: 'Daniel  ' },
      { email: 'admin@example.com', password: 'adminpassword', userType: 'admin', id: '2', name: 'Admin' }
    ];
    return users.find(user => user.email === email);
  };

  const handleLogout = () => {
    localStorage.removeItem('storedEmail');
    localStorage.removeItem('storedRememberMe');
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <div className='navbar'>
      <div className='nav-log'>
        <img src={logoBig} alt=''/>
        <p>SHOPPER</p>
      </div>

      <ul className='nav-menu'>
        <li><Link to='/' className={menu === 'shop' ? 'active' : ''}>Shop</Link></li>
        <li><Link to='/mens' className={menu === 'mens' ? 'active' : ''}>Mens</Link></li>
        <li><Link to='/womens' className={menu === 'womens' ? 'active' : ''}>Womens</Link></li>
        <li><Link to='/kids' className={menu === 'kids' ? 'active' : ''}>Kids</Link></li>
      </ul>

      <div className='nav-login-cart'>
        {isLoggedIn ? (
          <>
                 <Link to='/profile' className='user-link'>
              <span className='User-Name'>{userName}</span>
              <img className='User-icon' src={userIcon} alt='User Icon' />
              <div className="icon-on-line"></div>
              </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}

        <Link to='/cart'>
          <div className='cart'>
            <img src={cartIcon} alt='' />
          </div>
        </Link>
        <div className='nav-cart-count'>{getToTalCartItems()}</div>
      </div>
    </div>
  );
};
