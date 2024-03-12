import ReactDOM from 'react-dom';
import React from 'react';

import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';
import FirebaseInitialization from './config/FirebaseInitialization';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseInitialization/>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>
);