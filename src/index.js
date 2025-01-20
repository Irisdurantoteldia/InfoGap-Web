import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Importem les funcions correctes de Firebase
import { auth } from './Firebase/FirebaseConfig';  // La teva configuració personalitzada de Firebase
import Login from './Login';  // Component de login
import App from './App';  // Pàgina de les dades

// Comprova si l'usuari està autenticat
const MainApp = () => {  // Renombrem aquest component a MainApp
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authInstance = getAuth(); // Obtenim la instància d'autenticació

    // Comprovem l'estat d'autenticació de l'usuari
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Netegem el "listener" quan el component es desmuntat
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Si l'usuari no està autenticat, mostrar el Login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/app" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Si l'usuari està autenticat, mostrar la pàgina de les dades */}
        <Route path="/app" element={isAuthenticated ? <App /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// Renderitzem l'aplicació utilitzant createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));  // Crear l'arrel amb createRoot
root.render(
  <React.StrictMode>
    <MainApp />  {/* Utilitza MainApp en lloc d'App */}
  </React.StrictMode>
);
