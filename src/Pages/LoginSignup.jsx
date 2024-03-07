import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate em vez de useHistory
import Modal from 'react-modal';
import '../Css/login.css';

export const LoginSignup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Utilize useNavigate para navegação

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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

  // Função para verificar as credenciais do usuário (simulação)
  const checkLoginCredentials = (email, password) => {
    // Aqui você faria a lógica real para verificar as credenciais do usuário no seu sistema
    // Esta é apenas uma simulação
    return email === 'example@example.com' && password === 'password';
  };

  const handleLogin = () => {
    const { email, password } = loginData;

    const isLoggedIn = checkLoginCredentials(email, password);

    if (isLoggedIn) {
      // Redireciona para a página home se o login for bem-sucedido
      navigate('/');
    } else {
      alert('Invalid email or password');
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
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </div>
        <button onClick={openModal}>Create Account</button>
        <button onClick={handleLogin}>Login</button>
        <p className="loginsignup-login">
          Already have an account? <span>Login</span>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
          </div>
        </p>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Login Modal">
        <h2>Choose your login option</h2>
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
        <button onClick={handleFacebookLogin}>Sign in with Facebook</button>
        <button onClick={handleAppleLogin}>Sign in with Apple</button>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};
