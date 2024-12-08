import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContext";
import Modal from "./Modal"; // Importando o Modal
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { getUser } from "../../services/usuario";
import { createTransacao } from "../../services/transacao";
import { getVantagens } from "../../services/vantagem";

function VantagensList() {
  const [vantagens, setVantagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { userType, userId, mudar, setMudar } = useUserContext();

  const fetchVantagens = async () => {
    try {
      const data = await getVantagens();

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

  const fetchUserInfo = async () => {
    try {
      const data = await getUser();
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComprarVantagem = async (vantagemId) => {
    if (!userInfo || userInfo.pontos <= 0) return;

    try {
      await createTransacao({
        tipo: "compra",
        vantagemId,
      });

      setMudar(mudar + 1)
      alert("Compra realizada com sucesso!");
      fetchVantagens();
      fetchUserInfo(); // Atualiza os pontos do usuário após a compra
    } catch (error) {
      console.error("Erro ao realizar a compra:", error);
      alert("Não foi possível completar a compra. Tente novamente.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchVantagens();
    fetchUserInfo();
  }, [userType]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        {userType === "empresa" ? "Vantagens Cadastradas" : "Lista de Vantagens"}
      </h1>

      {userType === "empresa" && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg mb-8 hover:bg-green-600 transition-colors shadow-lg"
          onClick={openModal}
        >
          Cadastrar Vantagem
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={() => {}} // Substituir pela lógica do modal de criação
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vantagens.map((vantagem) => {
          const pontosInsuficientes = userInfo && userInfo.pontos < vantagem.preco;

          return (
            <div
              key={vantagem.id}
              className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <img
                src={vantagem.foto}
                alt={vantagem.nome}
                className="w-full h-48 object-cover bg-gray-100"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  {vantagem.nome}
                </h2>
                <p className="text-gray-600 mb-2">
                  <strong>Descrição:</strong> {vantagem.desc}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Preço:</strong> {vantagem.preco.toFixed(2)} Moedas
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Empresa:</strong> {vantagem.Empresa.nome_fantasia}
                </p>
                {userType === "aluno" && (
                  <button
                    onClick={() => handleComprarVantagem(vantagem.id)}
                    className={`px-4 py-2 rounded-lg shadow-lg transition-colors ${
                      pontosInsuficientes
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    title={pontosInsuficientes ? "Quantidade de Pontos insuficiente" : ""}
                    disabled={pontosInsuficientes}
                    style={
                      pontosInsuficientes
                        ? { cursor: "not-allowed" }
                        : undefined
                    }
                  >
                    Comprar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VantagensList;
