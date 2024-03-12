import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../Css/login.css';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { RingLoader } from 'react-spinners';


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
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar se o usuário está autenticado
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('storedEmail');
    const storedRememberMe = localStorage.getItem('storedRememberMe');

    if (storedEmail && storedRememberMe) {
      setLoginData({ ...loginData, email: storedEmail });
      setRememberMe(true);
    }

    // Verificar se o usuário está autenticado ao carregar o componente
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true); // Define o estado como autenticado se o usuário estiver autenticado
      } else {
        setLoggedIn(false); // Define o estado como não autenticado se o usuário não estiver autenticado
      }
      setLoading(false); // Define o estado de carregamento como falso quando o componente é montado
    });

    return () => unsubscribe(); // Limpar o observador de autenticação ao desmontar o componente
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const createUserAccount = (email) => {
    createUserWithEmailAndPassword(auth, email, 'senha_aleatoria')
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User account created:', user);
        // Adicione o código para redirecionar o usuário ou fornecer feedback adequado aqui
      })
      .catch((error) => {
        console.error('Error creating user account:', error);
        // Adicione o código para fornecer feedback adequado ao usuário aqui
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true); // Define o estado de carregamento como verdadeiro
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in user:', user);
      // Aqui você pode criar a conta do usuário no Firebase Auth
      createUserAccount(user.email);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false); // Define o estado de carregamento como falso após o login ser concluído
    }
  };

  const gerUserByEmail = (email) => {
    const users = [
      { email: 'progamin@example.com', password: 'userpassword', userType: 'User' },
      { email: 'admin@example.com', password: 'adminpassword', userType: 'admin' }
    ];
    return users.find(user => user.email === email);
  };

  const handleLogin = () => {
    setLoading(true); // Define o estado de carregamento como verdadeiro ao pressionar o botão de login
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
        navigate('/produtos-comprados');
      }
    } else {
      alert('Invalid email or password');
    }
    setLoading(false); // Define o estado de carregamento como falso após o login ser concluído
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
          <h1>{loggedIn ? 'Welcome back!' : 'Sign Up'}</h1> {/* Renderiza uma mensagem diferente se o usuário estiver autenticado */}
          {loggedIn ? null : ( // Renderiza os campos de entrada apenas se o usuário não estiver autenticado
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
  
          <button onClick={loggedIn ? null : openModal}>{loggedIn ? 'Continue' : 'Create Account'}</button> {/* Renderiza um botão diferente se o usuário estiver autenticado */}
          <button onClick={loggedIn ? null : handleLogin}>{loggedIn ? 'Continue' : 'Login'}</button> {/* Renderiza um botão diferente se o usuário estiver autenticado */}
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
