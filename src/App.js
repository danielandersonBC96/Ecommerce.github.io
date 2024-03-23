
import './App.css';
import { useState, useEffect } from 'react';
import { NavBar } from './Components/Navbar/NavBar';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Importe Navigate
import { Footer } from './Components/Footer/Footer';
import { ProfileAdmin } from './Pages/ProfileAdmin';
import { ProfileUser } from './Pages/ProfileUser';
import man_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

function App() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Simula se o usuário está logado como admin ou não
    const isAdmin = true;
    setUserType(isAdmin ? 'admin' : 'user');
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={man_banner} category='mens' />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category='womens' />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kids' />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/cart' element={<Cart />} />
          {/* Rota condicional com base no tipo de usuário */}
          {userType === 'admin' ? (
            <Route path='/profile' element={<ProfileAdmin />} />
          ) : (
            <Route path='/produtos-comprados' element={<ProfileUser />} />
          )}
          {/* Redireciona para a página de login se o tipo de usuário não estiver definido */}
          {userType === '' && <Route path='*' element={<Navigate to='/login' />} />}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
