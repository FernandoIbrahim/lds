import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para obter parâmetros da URL e navegação

function EditarDadosAluno() {
  const { id } = useParams(); // Obtém o ID do aluno da URL
  const navigate = useNavigate(); // Hook para navegação
  const [aluno, setAluno] = useState({
    nome: "",
    endereco: "",
    curso: "",
    instituicao_id: "",
    usuario: {
      id: "",
      email: "",
      senha: "",
      pontos: 0,
    },
  }); // Estado para armazenar os dados do aluno

  // Função para buscar os dados do aluno
  const fetchAluno = async () => {
    try {
      const response = await fetch(`http://localhost:3000/alunos/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar aluno");
      }
      const data = await response.json();
      setAluno(data);
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
    }
  };

  // Função para atualizar os dados do aluno
  const handleUpdate = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    try {
      const response = await fetch(`http://localhost:3000/alunos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar aluno");
      }
      navigate("/listar-alunos"); // Navega de volta para a lista de alunos após a atualização
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
    }
  };

  useEffect(() => {
    fetchAluno(); // Chama a função ao montar o componente
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Editar Dados do Aluno</h1>
      <form onSubmit={handleUpdate} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nome">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={aluno.nome}
            onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="endereco">
            Endereço
          </label>
          <input
            type="text"
            id="endereco"
            value={aluno.endereco}
            onChange={(e) => setAluno({ ...aluno, endereco: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="curso">
            Curso
          </label>
          <input
            type="text"
            id="curso"
            value={aluno.curso}
            onChange={(e) => setAluno({ ...aluno, curso: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="instituicao_id">
            ID da Instituição
          </label>
          <input
            type="number"
            id="instituicao_id"
            value={aluno.instituicao_id}
            onChange={(e) => setAluno({ ...aluno, instituicao_id: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Atualizar Dados
        </button>
      </form>
    </div>
  );
}

export default EditarDadosAluno;
