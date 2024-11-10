import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../hooks/UserContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { userType, setUserId, setUserType, setToken } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar os dados do usuário ao fazer logout
    setUserId(null);
    setUserType(null);
    setToken(null);

    // Redirecionar para a página inicial
    alert("Usuário Deslogado")
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/pagina-inicial" className="text-white text-lg font-bold">Página Inicial</Link>
        
        {/* Condicional para renderizar o link */}
        {userType ? (
          <button onClick={handleLogout} className="text-white">
            Sair
          </button>
        ) : (
          <Link to="/" className="text-white">
            Cadastrar Usuario
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
