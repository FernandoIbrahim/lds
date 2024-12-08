import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para obter parâmetros da URL e navegação
import { useUserContext } from '../../hooks/UserContext';
import { getProfessor, updateProfessor, deleteProfessor } from "../../services/professor";

function EditarDadosProfessor() {
  const { setUserId, setUserType, setToken } = useUserContext(); // Usa o contexto

  const { id } = useParams(); // Obtém o ID do professor da URL
  const navigate = useNavigate(); // Hook para navegação
  const [professor, setProfessor] = useState({
    nome: "",
    cpf: "",
    materia: "",
    instituicao_id: ""
  }); // Estado para armazenar os dados do professor
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal

  // Função para buscar os dados do professor
  const fetchProfessor = async () => {
    try {
      const data = await getProfessor(id);
      setProfessor(data);
      console.log(professor)
    } catch (error) {
      console.error("Erro ao buscar professor:", error);
    }
  };

  // Função para atualizar os dados do professor
  const handleUpdate = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    try {
      await updateProfessor(id, professor);
      navigate("/listar-professores"); // Navega de volta para a lista de professores após a atualização
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
    }
  };

  // Função para deletar o professor
  const handleDelete = async () => {
    try {
      await deleteProfessor(id);
      setUserId(null);
      setUserType(null);
      setToken(null);
      navigate("/listar-professores"); // Navega de volta para a lista de professores após a exclusão
    } catch (error) {
      console.error("Erro ao deletar professor:", error);
    }
  };

  // Efeito para buscar os dados do professor ao montar o componente
  useEffect(() => {
    fetchProfessor(); // Chama a função ao montar o componente
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Editar Dados do Professor</h1>
      <form onSubmit={handleUpdate} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nome">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={professor.nome}
            onChange={(e) => setProfessor({ ...professor, nome: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cpf">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            value={professor.cpf}
            onChange={(e) => setProfessor({ ...professor, cpf: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="materia">
            Disciplina
          </label>
          <input
            type="text"
            id="materia"
            value={professor.materia}
            onChange={(e) => setProfessor({ ...professor, materia: e.target.value })}
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
            value={professor.instituicao_id}
            onChange={(e) => setProfessor({ ...professor, instituicao_id: e.target.value })}
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

        {/* Botão para deletar o professor */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors ml-4"
        >
          Deletar Professor
        </button>
      </form>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja deletar este professor?</p>
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

export default EditarDadosProfessor;
