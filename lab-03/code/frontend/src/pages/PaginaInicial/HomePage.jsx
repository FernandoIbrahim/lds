import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação programática
import { useUserContext } from '../../hooks/UserContext';

function HomePage() {
  const navigate = useNavigate(); // Hook para navegação
  const { userId, userType } = useUserContext(); // Usa o contexto

  useEffect(() => {
    if (userId == null) {
      // navigate('/'); // Opcional: Redireciona para a página inicial se não estiver logado
    }
  }, [userId, navigate]); // Adicione userId e navigate como dependências

  const handleNavigation = (path) => {
    navigate(path); // Navega para a rota especificada
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold underline">Bem-vindo ao Sistema de Gerenciamento</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Card Listar Empresas Parceiras */}
        <div
          className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleNavigation("/listar-empresas")}
        >
          <h2 className="text-xl font-semibold mb-2">Listar Empresas Parceiras</h2>
          <p className="text-gray-700">Veja a lista de empresas parceiras cadastradas.</p>
        </div>

        {/* Card Listar Alunos */}
        <div
          className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleNavigation("/listar-alunos")}
        >
          <h2 className="text-xl font-semibold mb-2">Listar Alunos</h2>
          <p className="text-gray-700">Consulte todos os alunos cadastrados no sistema.</p>
        </div>

        {/* Card Listar Vantagens */}
        <div
          className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleNavigation("/listar-vantagens")}
        >
          <h2 className="text-xl font-semibold mb-2">Listar Vantagens</h2>
          <p className="text-gray-700">Descubra as vantagens disponíveis.</p>
        </div>

        {/* Card Editar Perfil */}
        {userId !== null && userType !== null ? (
          userType === 'aluno' ? (
            <div
              className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleNavigation(`/editar-alunos/${userId}`)}
            >
              <h2 className="text-xl font-semibold mb-2">Editar Perfil</h2>
              <p className="text-gray-700">Altere suas informações pessoais.</p>
            </div>
          ) : userType === 'empresa' ? (
            <div
              className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleNavigation(`/editar-empresas/${userId}`)}
            >
              <h2 className="text-xl font-semibold mb-2">Editar Perfil</h2>
              <p className="text-gray-700">Altere suas informações pessoais.</p>
            </div>
          ) : userType === 'professor' ? (
            <div
              className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleNavigation(`/editar-professores/${userId}`)} // Redireciona para o perfil do professor
            >
              <h2 className="text-xl font-semibold mb-2">Editar Perfil</h2>
              <p className="text-gray-700">Altere suas informações pessoais.</p>
            </div>
          ) : null
        ) : (
          <div
            className="bg-gray-200 border-2 border-gray-300 shadow-md rounded-lg p-6 cursor-not-allowed"
            onClick={() => alert('Faça login para editar seu perfil.')}
          >
            <h2 className="text-xl font-semibold mb-2">Editar Perfil</h2>
            <p className="text-gray-500">Disponível apenas para usuários logados.</p>
          </div>
        )}

        {/* Card Ver Extrato */}
        {userId !== null && userType !== null ? (
          <div
            className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleNavigation(`/extrato`)}
          >
            <h2 className="text-xl font-semibold mb-2">Ver Extrato</h2>
            <p className="text-gray-700">Acesse seu extrato de transações.</p>
          </div>
        ) : (
          <div
            className="bg-gray-200 border-2 border-gray-300 shadow-md rounded-lg p-6 cursor-not-allowed"
            onClick={() => alert('Faça login para acessar o extrato.')}
          >
            <h2 className="text-xl font-semibold mb-2">Ver Extrato</h2>
            <p className="text-gray-500">Disponível apenas para usuários logados.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
