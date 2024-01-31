
import './App.css';
import { NavBar } from './Components/Navbar/NavBar';
import { Shop } from './Pages/Shop';
import { ShopCategory  }  from './Pages/ShopCategory';
import { Product} from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <NavBar/>
       <Routes>
        <Route  path='/'  element={ <Shop/> }/>
        <Route  path='/mens' element={<ShopCategory  category='mens'/>}  />
        <Route  path='/womens' element={<ShopCategory  category='womens'/>}  />
        <Route  path='/kids' element={ <ShopCategory  category='kids'/>} />
          <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={ <Product/>}/>
          </Route>
        <Route path='/Login' element={<LoginSignup/>}/>
        <Route path='/cart' element={<Cart/>}/>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
 