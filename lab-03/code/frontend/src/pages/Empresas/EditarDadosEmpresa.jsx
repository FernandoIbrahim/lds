import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para obter parâmetros da URL e navegação

function EditarDadosEmpresa() {
  const { id } = useParams(); // Obtém o ID da empresa da URL
  const navigate = useNavigate(); // Hook para navegação
  const [empresa, setEmpresa] = useState({
    nome_fantasia: "",
    email: "",
    senha: "",
    cnpj: "",
  }); // Estado para armazenar os dados da empresa
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controle do modal

  // Função para buscar os dados da empresa
  const fetchEmpresa = async () => {
    try {
      const response = await fetch(`http://localhost:3000/empresas/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar empresa");
      }
      const data = await response.json();
      setEmpresa(data);
    } catch (error) {
      console.error("Erro ao buscar empresa:", error);
    }
  };

  // Função para atualizar os dados da empresa
  const handleUpdate = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    console.log(empresa);
    
    const empresaUpdate = {
      nome_fantasia: empresa.nome_fantasia,
      cnpj: empresa.cnpj,
    };
    console.log(empresaUpdate);
    try {
      const response = await fetch(`http://localhost:3000/empresas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empresaUpdate),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar empresa");
      }
      navigate("/listar-empresas"); // Navega de volta para a lista de empresas após a atualização
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
    }
  };

  // Função para deletar a empresa
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/empresas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar empresa");
      }
      navigate("/listar-empresas"); // Navega de volta para a lista de empresas após a exclusão
    } catch (error) {
      console.error("Erro ao deletar empresa:", error);
    }
  };

  useEffect(() => {
    fetchEmpresa(); // Chama a função ao montar o componente
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Editar Dados da Empresa</h1>
      <form onSubmit={handleUpdate} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nome_fantasia">
            Nome Fantasia
          </label>
          <input
            type="text"
            id="nome_fantasia"
            value={empresa.nome_fantasia}
            onChange={(e) => setEmpresa({ ...empresa, nome_fantasia: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cnpj">
            CNPJ
          </label>
          <input
            type="text"
            id="cnpj"
            value={empresa.cnpj}
            onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
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

      {/* Botão para deletar empresa */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
      >
        Deletar Empresa
      </button>

      {/* Modal de confirmação */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza que deseja deletar esta empresa?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)} // Fecha o modal
                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleDelete(); // Chama a função de deletar
                  setIsModalOpen(false); // Fecha o modal
                }}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditarDadosEmpresa;
