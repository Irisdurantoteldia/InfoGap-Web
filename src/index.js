import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import All from "./screens/All";
import Account from './screens/Account';  // El component que es renderitza a la ruta /account
import People from './screens/People';  // El component que es renderitza a la ruta /account
import DetailPage from "./screens/DetailPage";
import UserDetails from './screens/UserDetails';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Pantalla de Login */}
        <Route path="/all" element={<All />} />  {/* Pantalla de All */}
        <Route path="/account" element={<Account />} />
        <Route path="/people" element={<People />} />        
        <Route path="/detail" element={<DetailPage />} />     
        <Route path="/user/:userId" element={<UserDetails />} /> {/* Ruta per veure els detalls de l'usuari */}
   
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
