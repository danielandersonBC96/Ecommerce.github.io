import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import userIcon from '../Assets/png_user_icon.png';
import logoBig from '../Assets/logo_big.png';
import cartIcon from '../Assets/cart_icon.png';
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';

export const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { getToTalCartItems } = useContext(ShopContext);
  const [menu, setMenu] = useState('shop'); // Estado para controlar o item do menu ativo

  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyABRXp9M-W7FiG5KtjQxnaySXhuoJwIPhs",
    authDomain: "ecommerce-cc6b8.firebaseapp.com",
    projectId: "ecommerce-cc6b8",
    storageBucket: "ecommerce-cc6b8.appspot.com",
    messagingSenderId: "161292394724",
    appId: "1:161292394724:web:f60d3135b1c79d43fb0cf1",
    measurementId: "G-48SDPM1P5R"
  };

  // Inicialização do Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(); 

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const storedRememberMe = localStorage.getItem('storedRememberMe');
      setIsLoggedIn(storedRememberMe === 'true');

      if (storedRememberMe === 'true') {
        const storedEmail = localStorage.getItem('storedEmail');
        const localUser = getUserByEmail(storedEmail);
        if (localUser) {
          setUserName(localUser.name);
        } else {
          // Se não encontrarmos o usuário localmente, tentamos buscar no Firebase
          try {
            const snapshot = await get(ref(db, 'Usuarios/' + storedEmail.replace('.', '_')));
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setUserName(userData.name);
            }
          } catch (error) {
            console.error('Error fetching user data from Firebase:', error);
          }
        }
      }
    };

    checkLoggedInStatus();
  }, [db]);


  const getUserByEmail = (email) => {
    const users = [
      { name: 'Ui/Ux', email: 'UiUx@exemple.com', password: 'uiuxpassword', userType: 'user', id: '1' },
      { name: 'QaTest', email: 'QaTeste@exemple.com', password: 'testpassword', userType: 'user', id: '2' },
      { name: 'DevAcount', email: 'progamin@example.com', password: 'userpassword', userType: 'user', id: '3' },
      { name: 'Administrador', email: 'admin@example.com', password: 'adminpassword', userType: 'admin', id: '4' },
      { name: 'Product Oner', email: 'po@exemple.com', password: 'popassword', userType: 'admin', id: '5' },
      { name: 'Gp', email: 'gp@exemple.com', password: 'gppassword', userType: 'admin', id: '6' }
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
        <img src={logoBig} alt='' />
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
            <Link to='/produtos-comprados' className='user-link'>
              <span className='User-Name'>{userName}</span>
              <img className='User-icon' src={userIcon} alt='User Icon' />
              <div className="icon-on-line"></div> {/* Ícone "online" */}
            </Link>
           
            
          
           
            <Link to={'/'}>
            <button onClick={handleLogout}>Logout</button>
            </Link>       

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