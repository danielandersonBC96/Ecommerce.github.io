import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const FirebaseInitialization = () => {
  useEffect(() => {
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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // Initialize Storage
    const storage = getStorage(app);

    // Additional initialization or setup can be done here

    // Clean up any resources when component unmounts
    return () => {
      // Clean up any resources, if necessary
    };
  }, []);

  // Render nothing here as this component is only for initialization
  return null;
};

export default FirebaseInitialization;
