import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importando Link para navegação

function LoginPage() {
  const [activeLogin, setActiveLogin] = useState(null);

  const handleToggle = (loginType) => {
    setActiveLogin(activeLogin === loginType ? null : loginType);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Acesso - Sistema de Moedas</h1>
        
        {/* Login Aluno */}
        <div
          className={`cursor-pointer my-4 p-4 border rounded-lg transition-colors ${
            activeLogin === "aluno" ? "bg-gray-100" : "bg-white"
          } hover:bg-gray-100`}
          onClick={() => handleToggle("aluno")}
        >
          <h2 className="text-xl font-semibold text-blue-500">Cadastro Aluno</h2>
          {activeLogin === "aluno" && (
            <div className="pt-2 text-gray-700">
              <p>Como aluno, você pode acessar materiais de aula, ver notas, e enviar trabalhos.</p>
              <Link to="/cadastro-aluno"> {/* Link para a página do aluno */}
                <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Acessar como Aluno
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Login Professor */}
        <div
          className={`cursor-pointer my-4 p-4 border rounded-lg transition-colors ${
            activeLogin === "professor" ? "bg-gray-100" : "bg-white"
          } hover:bg-gray-100`}
          onClick={() => handleToggle("professor")}
        >
          <h2 className="text-xl font-semibold text-blue-500">Cadastro Professor</h2>
          {activeLogin === "professor" && (
            <div className="pt-2 text-gray-700">
              <p>Como professor, você pode gerenciar as disciplinas, postar conteúdos e corrigir atividades.</p>
              <Link to="/cadastro-professor"> {/* Link para a página do professor */}
                <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Acessar como Professor
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Login Empresa Parceira */}
        <div
          className={`cursor-pointer my-4 p-4 border rounded-lg transition-colors ${
            activeLogin === "empresa" ? "bg-gray-100" : "bg-white"
          } hover:bg-gray-100`}
          onClick={() => handleToggle("empresa")}
        >
          <h2 className="text-xl font-semibold text-blue-500">Cadastro Empresa Parceira</h2>
          {activeLogin === "empresa" && (
            <div className="pt-2 text-gray-700">
              <p>Como empresa parceira, você pode acessar o portal de vagas, cadastrar oportunidades e gerenciar inscrições.</p>
              <Link to="/cadastro-empresa"> {/* Link para a página da empresa */}
                <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Acessar como Empresa Parceira
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Link para login caso já tenha cadastro */}
        <div className="mt-6 text-center text-gray-700">
          <p>Já tem cadastro? <Link to="/login" className="text-blue-500 hover:text-blue-700">Faça Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
