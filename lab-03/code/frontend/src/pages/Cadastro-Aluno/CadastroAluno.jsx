import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação programática
import { useUserContext } from '../../hooks/UserContext';


function CadastroAluno() {
  const { setUserId, setUserType } = useUserContext(); // Usa o contexto


  const [nome, setNome] = useState("");
  const [email, setEmail] = useState(""); // Novo estado para o email
  const [senha, setSenha] = useState(""); // Novo estado para a senha
  const [endereco, setEndereco] = useState("");
  const [curso, setCurso] = useState("");
  const [instituicaoId, setInstituicaoId] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleCadastro = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const alunoData = {
      nome,
      email,
      senha,
      endereco,
      curso,
      instituicao_id: parseInt(instituicaoId), // Certifique-se de que seja um número
    };

    try {
      // Faz a requisição para criar o aluno
      const response = await fetch("http://localhost:3000/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alunoData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar aluno");
      }

      const createdAluno = await response.json(); // Recebe o aluno criado da resposta
      console.log("Aluno criado:", createdAluno); // Log do aluno criado

     
      setUserId(createdAluno.id);
      setUserType('aluno');
      alert("Aluno cadastrado com sucesso!"); // Alerta de sucesso
      navigate("/pagina-inicial"); // Redireciona para a página de sucesso

    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno. Tente novamente."); // Alerta de erro
      navigate('/')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Cadastro Aluno</h1>
        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
              Nome
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
              Senha
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endereco">
              Endereço
            </label>
            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="curso">
              Curso
            </label>
            <input
              type="text"
              id="curso"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instituicaoId">
              ID da Instituição
            </label>
            <input
              type="number"
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

export default CadastroAluno;
