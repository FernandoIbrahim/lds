import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContext";
import Modal from "./Modal"; // Importando o Modal

function VantagensList() {
  const [vantagens, setVantagens] = useState([]); // Estado para armazenar vantagens
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const { userType, token } = useUserContext(); // Usa o contexto para pegar o tipo de usuário e token

  // Função para buscar as vantagens
  const fetchVantagens = async () => {
    try {
      const response = await fetch("http://localhost:3000/vantagens");
      if (!response.ok) {
        throw new Error("Erro ao buscar vantagens");
      }
      const data = await response.json();
      setVantagens(data);
    } catch (error) {
      console.error("Erro ao buscar vantagens:", error);
    }
  };

  // Função para cadastrar uma nova vantagem
  const handleCadastrarVantagem = async (novaVantagem) => {
    try {
      const response = await fetch("http://localhost:3000/vantagens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Passando o token no cabeçalho Authorization
        },
        body: JSON.stringify(novaVantagem)
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar vantagem");
      }

      // Após o cadastro, refazer a busca das vantagens para obter a lista completa
      fetchVantagens(); // Chama novamente a função de buscar as vantagens
      
      console.log("Vantagem cadastrada com sucesso!");
      setIsModalOpen(false); // Fecha o modal após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar vantagem:", error);
    }
  };

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchVantagens(); // Chama a função ao montar o componente
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Lista de Vantagens</h1>

      {/* Botão de Cadastrar Vantagem (exibido apenas para empresas) */}
      {userType === "empresa" && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition-colors"
          onClick={openModal} // Abre o modal
        >
          Cadastrar Vantagem
        </button>
      )}

      {/* Modal para cadastrar vantagem */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal} // Fecha o modal
        onSubmit={handleCadastrarVantagem} // Envia os dados do formulário para cadastrar
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vantagens.map((vantagem) => (
          <div
            key={vantagem.id}
            className="bg-green-50 border-2 border-green-300 shadow-md rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              {vantagem.nome}
            </h2>
            <p className="text-gray-700"><strong>Descrição:</strong> {vantagem.desc}</p>
            <p className="text-gray-700"><strong>Preço:</strong>  {vantagem.preco.toFixed(2)} Moedas</p>
            <p className="text-gray-700"><strong>Empresa:</strong> {vantagem.Empresa.nome_fantasia}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VantagensList;
