import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { RingLoader } from 'react-spinners';
import { get ,ref, set , getDatabase  } from 'firebase/database';
import { getDoc, doc } from "firebase/firestore";

// Importe Firestore e as funções necessárias

import '../Css/login.css'
import  close from '../Components/Assets/cart_cross_icon.png';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);



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


export const LoginSignup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

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
  
    // Escrever os dados no banco de dados Firebase
    set(ref(db, 'Usuarios/' + formData.email.replace('.', '_')), {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }).then(() => {
      console.log('Dados cadastrados com sucesso no banco de dados Firebase.');
      // Limpar o formulário após o cadastro bem-sucedido
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }).catch((error) => {
      console.error('Erro ao cadastrar os dados no banco de dados Firebase:', error);
    });
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


  const getUserByEmail = (email) => {

    const users = [

      { name: 'Ui/Ux', email: 'UiUx@exemple.com', password: 'uiuxpassword', userType: 'user', id: '1' },
      { name: 'QaTest', email: 'QaTeste@exemple.com', password: 'testpassword', userType: 'user', id: '2' },
      { name: 'DevAcount', email: 'progamin@example.com', password: 'userpassword', userType: 'user', id: '3' },
      { name: 'Administrador', email: 'admin@example.com', password: 'adminpassword', userType: 'admin', id: '4' },
      { name:'Product Oner',email: 'po@exemple.com', password:'popassword ' , userType:'admin', id:'5'},
      { name:'Gp ', email: 'gp@exemple.com', password:'gppassword', userType:'admin', id:'6'}
      

    ];
    return users.find(user => user.email === email);
  };

  const handleLogin = async () => {
    setLoading(true); // Define loading como true ao clicar no botão de login
  
    try {
      const { email, password } = loginData;
  
      // Verifica se o usuário está registrado localmente
      const localUser = getUserByEmail(email);
      if (localUser && localUser.password === password) {
        // Autenticação local bem-sucedida
        // Você pode adicionar aqui o redirecionamento adequado com base no tipo de usuário, se necessário
        if (localUser.userType === 'admin') {
          navigate('/cadastrar-produtos'); // Redireciona para a página de administração se o usuário for um administrador
        } else {
          navigate('/produtos-comprados'); // Redireciona para a página de produtos comprados
        }
        // Armazena as informações do usuário localmente, se necessário
        if (rememberMe) {
          localStorage.setItem('storedEmail', email);
          localStorage.setItem('storedRememberMe', true);
        } else {
          localStorage.removeItem('storedEmail');
          localStorage.removeItem('storedRememberMe');
        }
        // Exibe um alerta de login bem-sucedido
        alert('Login bem-sucedido');
      } else {
        // Verifica se o usuário está registrado no banco de dados Firebase
        const userRef = ref(db, 'Usuarios/' + email.replace('.', '_'));
        const snapshot = await get(userRef);
  
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const { password: storedPassword, userType, name } = userData;
  
          // Verifica se a senha fornecida corresponde à senha registrada no banco de dados
          if (password === storedPassword) {
            if (rememberMe) {
              localStorage.setItem('storedEmail', email); // Armazena o e-mail do usuário no localStorage
              localStorage.setItem('storedRememberMe', true); // Armazena o sinalizador "lembrar-me" no localStorage
            } else {
              localStorage.removeItem('storedEmail'); // Remove o e-mail do usuário do localStorage
              localStorage.removeItem('storedRememberMe'); // Remove o sinalizador "lembrar-me" do localStorage
            }
  
            // Autentica o usuário como bem-sucedido
            // Redireciona o usuário com base no tipo (admin ou comum)
            if (userType === 'admin') {
              navigate('/cadastrar-produtos'); // Redireciona para a página de administração se o usuário for um administrador
            } else {
              navigate('/produtos-comprados'); // Redireciona para a página de produtos comprados
            }
  
            // Exibe um alerta de login bem-sucedido
            alert('Login bem-sucedido');
          } else {
            alert('Invalid email or password'); // Exibe um alerta se a senha for inválida
          }
        } else {
          alert('User not found'); // Exibe um alerta se o e-mail não estiver registrado no banco de dados
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again.'); // Exibe um alerta se houver um erro no login
    }
  
    setLoading(false); // Define loading como false após o login ser concluído
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
              <button onClick={() => handleLogin('itemId')}>{loggedIn ? 'Continue' : 'Login'}</button>
              <button onClick={loggedIn ? null : openModal}>{loggedIn ? 'Continue' : 'Create Account'}</button>
           
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2>Cadastro</h2>
          <img src={close} alt="Fechar" onClick={() => setModalIsOpen(false)} />
      </div>
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
      </div>
   </form>
  </Modal>
</div>     
  );
};