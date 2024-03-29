import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../Css/login.css';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { RingLoader } from 'react-spinners';
import { ShopContext } from '../Context/ShopContext';

// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyABRXp9M-W7FiG5KtjQxnaySXhuoJwIPhs",
  authDomain: "ecommerce-cc6b8.firebaseapp.com",
  projectId: "ecommerce-cc6b8",
  storageBucket: "ecommerce-cc6b8.appspot.com",
  messagingSenderId: "161292394724",
  appId: "1:161292394724:web:f60d3135b1c79d43fb0cf1",
  measurementId: "G-48SDPM1P5R"
};
const spinnerStyles = {
  display: 'block',
  margin: '0 auto'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const LoginSignup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('storedEmail');
    const storedRememberMe = localStorage.getItem('storedRememberMe');
  
    if (storedEmail && storedRememberMe) {
      setLoginData({ ...loginData, email: storedEmail });
      setRememberMe(true);
    }
  }, [loginData]); // Adicione loginData como uma dependência
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const createUserAccount = async (email) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, 'senha_aleatoria');
      const user = userCredential.user;
      console.log('User account created:', user);
    } catch (error) {
      console.error('Error creating user account:', error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in user:', user);
      createUserAccount(user.email);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const gerUserByEmail = (email) => {
    const users = [
      { email: 'progamin@example.com', password: 'userpassword', userType: 'User', id: '1' },
      { email: 'admin@example.com', password: 'adminpassword', userType: 'admin', id: '2' }
    ];
    return users.find(user => user.email === email);
  };

  const handleLogin = async (itemId) => {
    setLoading(true);
    const { email, password } = loginData;
    const user = gerUserByEmail(email);


    if (user && user.password === password) {
      if (rememberMe) {
        localStorage.setItem('storedEmail', email);
        localStorage.setItem('storedRememberMe', true);
      } else {
        localStorage.removeItem('storedEmail');
        localStorage.removeItem('storedRememberMe');
      }

      if (user.userType === 'admin') {
        navigate('/cadastrar-produtos');
      } else {
        // Aqui você associaria a compra ao usuário logado antes de redirecionar
        await addToCart(user.id, itemId);
        navigate('/produtos-comprados');
      }
    } else {
      alert('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="loginsignup">
      {loading ? (
        <div className="loading-animation">
          <RingLoader color={'#123abc'} loading={loading} css={spinnerStyles} size={150} />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="loginsignup-container">
          <h1>{loggedIn ? 'Welcome back!' : 'Sign Up'}</h1>
          {!loggedIn && (
            <div className="loginsignup-fields">
              <input
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <label>
                Remember me
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </label>
            </div>
          )}

          <button onClick={loggedIn ? null : openModal}>{loggedIn ? 'Continue' : 'Create Account'}</button>
          <button onClick={loggedIn ? null : () => handleLogin('itemId')}>{loggedIn ? 'Continue' : 'Login'}</button>
        </div>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Login Modal">
        <h2>Choose your login option</h2>
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
        <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
      </Modal>
    </div>
  );
};
