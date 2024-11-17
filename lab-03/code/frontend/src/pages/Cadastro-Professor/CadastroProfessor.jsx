import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../hooks/UserContext';

function CadastroProfessor() {
  const { setUserId, setUserType, setToken } = useUserContext();
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [materia, setMateria] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [instituicaoId, setInstituicaoId] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    const professorData = {
      cpf,
      nome,
      materia,
      email,
      senha,
      instituicao_id: instituicaoId,
    };

    try {
      // Cria o professor
      const response = await fetch("http://localhost:3000/professores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(professorData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar professor");
      }

      const createdProfessor = await response.json();
      console.log("Professor criado:", createdProfessor);

      setUserId(createdProfessor.id);
      setUserType('professor');

      // Realiza login após cadastro
      const loginResponse = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Erro ao fazer login");
      }

      const loginData = await loginResponse.json();
      setToken(loginData.token);

      alert("Professor cadastrado com sucesso!");
      navigate("/pagina-inicial");

    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      alert("Erro ao cadastrar professor. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Cadastro Professor</h1>
        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">CPF</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="materia" className="block text-gray-700 text-sm font-bold mb-2">Matéria</label>
            <input
              type="text"
              id="materia"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="instituicaoId" className="block text-gray-700 text-sm font-bold mb-2">ID da Instituição</label>
            <input
              type="text"
              id="instituicaoId"
              value={instituicaoId}
              onChange={(e) => setInstituicaoId(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroProfessor;
