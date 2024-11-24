import React, { useEffect, useState } from "react";

function EmpresaList() {
  const [empresas, setEmpresas] = useState([]); // Estado para armazenar empresas
  const [filtro, setFiltro] = useState(""); // Estado para o filtro

  // Função para buscar as empresas
  const fetchEmpresas = async () => {
    try {
      const response = await fetch("http://localhost:3000/empresas");
      if (!response.ok) {
        throw new Error("Erro ao buscar empresas");
      }
      const data = await response.json();
      setEmpresas(data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    }
  };

  useEffect(() => {
    fetchEmpresas(); // Chama a função ao montar o componente
  }, []);

  // Filtra as empresas com base no nome_fantasia
  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.nome_fantasia.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Lista de Empresas</h1>
      {/* Barra de Pesquisa */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por Nome Fantasia"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)} // Atualiza o filtro
          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Listagem das Empresas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {empresasFiltradas.map((empresa) => (
          <div
            key={empresa.id}
            className="bg-white border-2 border-blue-300 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105 transform"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">{empresa.nome_fantasia}</h2>
            <p className="text-gray-700 text-sm mb-2">
              <strong>CNPJ:</strong> {empresa.cnpj}
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Atividade:</strong> {empresa.atividade_economica || "Não especificada"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmpresaList;
