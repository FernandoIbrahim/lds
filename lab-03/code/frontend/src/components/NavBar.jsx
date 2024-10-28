// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/pagina-inicial" className="text-white text-lg font-bold">Página Inicial</Link>
        <Link to="/" className="text-white" >Cadastrar Usuario</Link>
      </div>
    </nav>
  );
}

export default Navbar;
