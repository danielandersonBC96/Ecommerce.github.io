import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../Css/login.css';

 export const LoginSignup = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('storedEmail');
    const storedRememberMe = localStorage.getItem('storedRememberMe');

    if (storedEmail && storedRememberMe) {
      setLoginData({ ...loginData, email: storedEmail });
      setRememberMe(true);
    }
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleGoogleLogin = () => {
    // Lógica para autenticar com conta do Google
  };

  const handleFacebookLogin = () => {
    // Lógica para autenticar com conta do Facebook
  };

  const handleAppleLogin = () => {
    // Lógica para autenticar com conta da Apple
  };

  const checkLoginCredentials = (email, password) => {
    const user = gerUserByEmail(email);

    if (!user) return false;
    return user.password === password;
  };

  const gerUserByEmail = (email) => {
    const users = [
      { email: 'progamin@example.com', password: 'userpassword', userType: 'User' },
      { email: 'admin@example.com', password: 'adminpassword', userType: 'admin' }
    ];
    return users.find(user => user.email === email);
  };

  const handleLogin = () => {
    const { email, password } = loginData;
    const isLoggedIn = checkLoginCredentials(email, password);

    if (isLoggedIn) {
       let user = gerUserByEmail(email);
      if (user.userType === 'admin') {
        navigate('/cadastrar-produtos');
      } else {
        navigate('/produtos-comprados');
      }
    } else {
      alert('Invalid email or password');
    }

    if (rememberMe) {
      localStorage.setItem('storedEmail', email);
      localStorage.setItem('storedRememberMe', true);
    } else {
      localStorage.removeItem('storedEmail');
      localStorage.removeItem('storedRememberMe');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
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

        <button onClick={openModal }>Create Account</button>
        <button onClick={handleLogin}>Login</button>
      
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Login Modal">
        <h2>Choose your login option</h2>
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
        <button onClick={handleFacebookLogin}>Sign in with Facebook</button>
        <button onClick={handleAppleLogin}>Sign in with Apple</button>
        <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
      </Modal>
    </div>
  );
};

