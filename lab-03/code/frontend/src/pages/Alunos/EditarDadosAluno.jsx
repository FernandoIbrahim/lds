import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para obter parâmetros da URL e navegação
import { useUserContext } from '../../hooks/UserContext';


function EditarDadosAluno() {
  const { setUserId, setUserType,setToken } = useUserContext(); // Usa o contexto

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
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal

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

  // Função para deletar o aluno
  const handleDelete = async () => {
    console.log(id)
    try {
      const response = await fetch(`http://localhost:3000/alunos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar aluno");
      }
      setUserId(null)
      setUserType(null)
      setToken(null)
      navigate("/listar-alunos"); // Navega de volta para a lista de alunos após a exclusão
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
    }
  };

  // Efeito para buscar os dados do aluno ao montar o componente
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

        {/* Botão para deletar o aluno */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors ml-4"
        >
          Deletar Aluno
        </button>
      </form>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja deletar este aluno?</p>
            <div className="mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 mr-2"
              >
                Deletar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditarDadosAluno;
