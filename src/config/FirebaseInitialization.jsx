import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const FirebaseInitialization = () => {
  useEffect(() => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyABRXp9M-W7FiG5KtjQxnaySXhuoJwIPhs",
      authDomain: "ecommerce-cc6b8.firebaseapp.com",
      projectId: "ecommerce-cc6b8",
      storageBucket: "ecommerce-cc6b8.appspot.com",
      messagingSenderId: "161292394724",
      appId: "1:161292394724:web:f60d3135b1c79d43fb0cf1",
      measurementId: "G-48SDPM1P5R"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // You can do further initialization or setup here if needed

    // Ensure that you clean up any resources when component unmounts
    return () => {
      // Clean up any resources, if necessary
    };
  }, []);

  // Render nothing here as this component is only for initialization
  return null;
};

export default FirebaseInitialization;
