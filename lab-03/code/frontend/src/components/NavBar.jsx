import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Importando o ícone de logout

function Navbar() {
  const { userType, setUserId, setUserType, setToken, userId, token, mudar } = useUserContext();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = () => {
    // Limpar os dados do usuário ao fazer logout
    setUserId(null);
    setUserType(null);
    setToken(null);

    // Redirecionar para a página inicial
    alert("Usuário Deslogado");
    navigate('/');
  };

  useEffect(() => {
    // Função para buscar as informações do usuário logado
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error('Erro ao buscar informações do usuário');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    console.log("MUDANDO")
    if (userId) {
      fetchUserInfo();
    }
  }, [userId, token, mudar]);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/pagina-inicial" className="text-white text-lg font-bold">Página Inicial</Link>

        <div className="flex items-center space-x-7">
          {/* Exibe as informações do usuário se estiver logado */}
          {userType ? (
            <>
              <div className="text-white flex items-center space-x-7">
                <span className="font-semibold">Olá, {userInfo?.email}</span>
                <span className="font-semibold">ID: {userId}</span>
                <span className="px-3 py-1 bg-yellow-600 rounded-full text-black text-sm ">
                  {userInfo?.pontos} pontos
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-600 transition-colors duration-300"
              >
                <FaSignOutAlt className="inline-block mr-2" /> Sair
              </button>
            </>
          ) : (
            <Link to="/" className="text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
