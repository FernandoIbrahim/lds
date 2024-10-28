import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação programática
import { useUserContext } from '../../hooks/UserContext';

function HomePage() {
  const navigate = useNavigate(); // Hook para navegação
  const { userId, userType } = useUserContext(); // Usa o contexto

  useEffect(() => {
    if (userId == null) {
      //navigate('/');
    }
  }, [userId, navigate]); // Adicione userId e navigate como dependências

  const handleNavigation = (path) => {
    navigate(path); // Navega para a rota especificada
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 underline">Bem-vindo ao Sistema de Gerenciamento</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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

        {/* Card Editar Perfil com lógica de userType */}
        {userType === 'aluno' ? (
          <div
            className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleNavigation(`/editar-alunos/${userId}`)} // Rota para editar aluno
          >
            <h2 className="text-xl font-semibold mb-2">Editar Perfil</h2>
            <p className="text-gray-700">Altere suas informações pessoais.</p>
          </div>
        ) : userType === 'empresa' ? (
          <div
            className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleNavigation(`/editar-empresas/${userId}`)} // Rota para editar empresa
          >
            <h2 className="text-xl font-semibold mb-2">Editar Perfil</h2>
            <p className="text-gray-700">Altere suas informações pessoais.</p>
          </div>
        ) : (
            <div
            className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
                alert('Você não está cadastrado no sistema')
                handleNavigation(`/`)
            }} // Rota para editar empresa
          >
            <h2 className="text-xl font-semibold mb-2">Editar Perfil</h2>
            <p className="text-gray-700">Altere suas informações pessoais.</p>
          </div>
        )}

        {/* Card Excluir Perfil */}
        
      </div>
    </div>
  );
}

export default HomePage;
