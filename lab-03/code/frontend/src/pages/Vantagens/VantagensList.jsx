import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContext";
import Modal from "./Modal"; // Importando o Modal
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function VantagensList() {
  const [vantagens, setVantagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userType, token, userId } = useUserContext();

  const fetchVantagens = async () => {
    try {
      const response = await fetch("http://localhost:3000/vantagens");
      if (!response.ok) {
        throw new Error("Erro ao buscar vantagens");
      }
      const data = await response.json();

      if (userType === "empresa") {
        const vantagensDaEmpresa = data.filter(
          (vantagem) => vantagem.empresa_id === userId
        );
        setVantagens(vantagensDaEmpresa);
      } else {
        setVantagens(data);
      }
    } catch (error) {
      console.error("Erro ao buscar vantagens:", error);
    }
  };

  const handleCadastrarVantagem = async (novaVantagem) => {
    if(novaVantagem.preco < 1){
      alert("Não é possível cadastrar vantagens com preço negativo!")
      return
    }

    try {
      const response = await fetch("http://localhost:3000/vantagens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novaVantagem),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar vantagem");
      }

      fetchVantagens();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar vantagem:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchVantagens();
  }, [userType]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        {userType === "empresa" ? "Vantagens Cadastradas" : "Lista de Vantagens"}
      </h1>

      {userType === "empresa" && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg mb-14 hover:bg-green-600 transition-colors"
          onClick={openModal}
        >
          Cadastrar Vantagem
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCadastrarVantagem}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {vantagens.map((vantagem) => (
          <div
            key={vantagem.id}
            className="bg-white border-2 border-gray-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">
                {vantagem.nome}
              </h2>
              {userType === "empresa" && (
                <div className="flex gap-2">
                  
                </div>
              )}
            </div>
            <p className="text-gray-600">
              <strong>Descrição:</strong> {vantagem.desc}
            </p>
            <p className="text-gray-600">
              <strong>Preço:</strong> {vantagem.preco.toFixed(2)} Moedas
            </p>
            <p className="text-gray-600">
              <strong>Empresa:</strong> {vantagem.Empresa.nome_fantasia}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VantagensList;
