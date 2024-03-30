import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { RingLoader } from 'react-spinners';
import { ShopContext } from '../Context/ShopContext';
import { getDatabase, ref, set } from 'firebase/database';
import '../Css/login.css'
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
const customStyles = {
  content: {
    backgroundColor: 'white', // Cor de fundo preto
    border: 'none', // Sem borda
    borderRadius: '8px', // Borda arredondada
    maxWidth: '600px', // Largura máxima
    margin: 'auto', // Centralizar na tela
    padding: '20px' // Espaçamento interno
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export const LoginSignup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Escrever os dados no banco de dados Firebase em um caminho específico
    set(ref(db, "Usuarios"), {
      name: formData.name,
      email: formData.email
    }).then(() => {
      console.log('Dados cadastrados com sucesso no banco de dados Firebase.');
    }).catch((error) => {
      console.error('Erro ao cadastrar os dados no banco de dados Firebase:', error);
    });

    // Após o envio do formulário, você pode fechar o modal
    setModalIsOpen(false);
  };



  useEffect(() => {
    const storedEmail = localStorage.getItem('storedEmail');
    const storedRememberMe = localStorage.getItem('storedRememberMe');
  
    if (storedEmail && storedRememberMe) {
      setLoginData({ ...loginData, email: storedEmail });
      setRememberMe(true);
    }
  }, []); // Remova loginData das dependências para evitar loops infinitos
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
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
    setLoading(true); // Defina loading como true antes de iniciar o login com Google

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in user:', user);
      createUserAccount(user.email);
      navigate('/produtos-comprados'); // Redirecione após o login ser concluído
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false); // Defina loading como false após o login (com sucesso ou falha)
    }
  };

  const gerUserByEmail = (email) => {
    const users = [
      { email: 'progamin@example.com', password: 'userpassword', userType: 'user', id: '1' },
      { email: 'admin@example.com', password: 'adminpassword', userType: 'admin', id: '2' }
    ];
    return users.find(user => user.email === email);
  };

  const handleLogin = async (itemId) => {
    setLoading(true); // Define loading como true ao clicar no botão de login

    // Simula um login bem-sucedido após 5 segundos
    setTimeout(async () => {
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
      
          navigate('/produtos-comprados');
        }
      } else {
        alert('Invalid email or password');
      }

      setLoading(false); // Define loading como false após o login ser concluído
    }, 5000); // 5 segundos de timeout para simular um login demorado
  };

  return (
    <div className="loginsignup">
       <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <RingLoader color={'#FF0000'} loading={loading} size={150} />
          <p>Loading...</p>
        </div>
      )}
      
      {!loading && (
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

          {!loggedIn && (
            <>
              <button onClick={loggedIn ? null : openModal}>{loggedIn ? 'Continue' : 'Create Account'}</button>
              <button onClick={() => handleLogin('itemId')}>{loggedIn ? 'Continue' : 'Login'}</button>
            </>
          )}
        </div>
      )}
    </div>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Cadastro Modal"
        style={customStyles} // Aplicar os estilos personalizados
      >
  <h2>Cadastro</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Nome:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="password">Senha:</label>
      <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="confirm-password">Confirmar Senha:</label>
      <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <button type="submit">Cadastrar</button>
      <button onClick={() => setModalIsOpen(false)}>x</button>
    </div>
  </form>
 
</Modal>
    </div>
  );
};
