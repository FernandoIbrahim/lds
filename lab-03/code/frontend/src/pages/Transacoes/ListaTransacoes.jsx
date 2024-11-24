import React, { useEffect, useState } from "react";
import { FaDonate, FaShoppingCart, FaFilter, FaBitcoin } from "react-icons/fa";
import { useUserContext } from "../../hooks/UserContext";
import { GrTransaction } from "react-icons/gr";




function ListaTransacoes() {
  const { token, userId } = useUserContext();
  const [transacoesOriginais, setTransacoesOriginais] = useState([]);
  const [transacoesFiltradas, setTransacoesFiltradas] = useState([]);
  const [erro, setErro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtros, setFiltros] = useState({
    dataMinima: "",
    dataMaxima: "",
    tipoTransacao: "",
  });

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const response = await fetch("http://localhost:3000/transacao", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar as transações.");
        }

        const data = await response.json();
        
        // Ordenando as transações pela data (do mais recente para o mais antigo)
        data.sort((a, b) => new Date(b.data) - new Date(a.data));

        setTransacoesOriginais(data);
        setTransacoesFiltradas(data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
        setErro(error.message);
      }
    };

    fetchTransacoes();
  }, [token]);

  const filtrarTransacoes = () => {
    const transacoesFiltradas = transacoesOriginais.filter((transacao) => {
      const dataTransacao = new Date(transacao.data).toISOString().split("T")[0];
      const correspondeDataMinima =
        !filtros.dataMinima || dataTransacao >= filtros.dataMinima;
      const correspondeDataMaxima =
        !filtros.dataMaxima || dataTransacao <= filtros.dataMaxima;
      const correspondeTipo =
        !filtros.tipoTransacao || transacao.tipo === filtros.tipoTransacao;

      return correspondeDataMinima && correspondeDataMaxima && correspondeTipo;
    });

    setTransacoesFiltradas(transacoesFiltradas);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Lista de Transações</h1>
      <button
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        <FaFilter className="mr-2" />
        Filtrar
      </button>

      {erro && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          {erro}
        </div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
        {transacoesFiltradas.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhuma transação encontrada.</p>
        ) : (
          <ul>
            {transacoesFiltradas.map((transacao) => (
              <li
                key={transacao.id}
                className="flex items-center justify-between border-b py-4 last:border-b-0"
              >
                <div className="flex items-center">
                  {transacao.tipo === "doacao" && userId == transacao.usuario1 ? (
                    
                    <GrTransaction className="text-red-500 mr-3 text-lg" />
                    
                  ) : transacao.tipo === "doacao" && userId != transacao.usuario1 ? (
                    <GrTransaction className="text-green-500 mr-3 text-lg" />

                  ): (
                    <FaShoppingCart className="text-blue-500 mr-3 text-lg" />
                  )}
                  <div>
                    <p className="text-gray-800 font-medium flex flex-nowrap">
                      {transacao.tipo.charAt(0).toUpperCase() + transacao.tipo.slice(1)} - R$
                      
                      {transacao.valor.toFixed(2)} <span className="text-yellow-600 ml-3 mt-1"><FaBitcoin/></span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Data: {new Date(transacao.data).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right text-gray-500 text-sm">
                  <p>De: {transacao.usuario1}</p>
                  <p>Para: {transacao.usuario2}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal de Filtros */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Filtrar Transações</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Data Mínima</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2 mt-1"
                value={filtros.dataMinima}
                onChange={(e) =>
                  setFiltros({ ...filtros, dataMinima: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Data Máxima</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2 mt-1"
                value={filtros.dataMaxima}
                onChange={(e) =>
                  setFiltros({ ...filtros, dataMaxima: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo de Transação</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1"
                value={filtros.tipoTransacao}
                onChange={(e) =>
                  setFiltros({ ...filtros, tipoTransacao: e.target.value })
                }
              >
                <option value="">Todos</option>
                <option value="doacao">Doação</option>
                <option value="compra">Compra</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={filtrarTransacoes}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaTransacoes;
