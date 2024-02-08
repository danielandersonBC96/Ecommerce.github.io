
import './App.css';
import { NavBar } from './Components/Navbar/NavBar';
import { Shop } from './Pages/Shop';
import { ShopCategory }  from './Pages/ShopCategory';
import { Product} from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';
import man_banner  from './Components/Assets/banner_mens.png';
import women_banner from  './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <NavBar/>
       <Routes>
        <Route  path='/'  element={ <Shop/> }/>
        <Route  path='/mens' element={<ShopCategory banner={man_banner}  category='mens'/>}  />
        <Route  path='/womens' element={<ShopCategory  banner={women_banner}category='womens'/>}  />
        <Route  path='/kids' element={ <ShopCategory   banner={kid_banner}   category='kids'/>} />
          <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={ <Product/>}/>
          </Route>
        <Route path='/Login' element={<LoginSignup/>}/>
        <Route path='/cart' element={<Cart/>}/>
       </Routes>
      <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
 