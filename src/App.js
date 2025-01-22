import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FSection from './FSection';
import Login from './screens/Login';  // Assegura't que la ruta sigui correcta
import All from './screens/All';  // El component que es renderitza a la ruta /all
import Account from './screens/Account';  // El component que es renderitza a la ruta /account
import People from './screens/People';  // El component que es renderitza a la ruta /account
import DetailPage from "./screens/DetailPage";
import UserDetails from './screens/UserDetails';




export default function App() {
  const [currentSection, setCurrentSection] = React.useState(1);

  const handlePress = (id) => {
    setCurrentSection(id);
  };

  return (
    <Router>
      {/* Mostrem la secció de botons (FSection) */}
      <FSection currentSection={currentSection} onPress={handlePress} />

      {/* Configuració de les rutes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/all" element={<All />} /> {/* Ruta per la pàgina All */}
        <Route path="/account" element={<Account />} />
        <Route path="/people" element={<People />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/user/:userId" element={<UserDetails />} /> {/* Ruta per veure els detalls de l'usuari */}

        
      </Routes>
    </Router>
  );
}
