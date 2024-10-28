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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Lista de Empresas</h1>
      {/* Barra de Pesquisa */}
      <input
        type="text"
        placeholder="Buscar por Nome Fantasia"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)} // Atualiza o filtro
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {empresasFiltradas.map((empresa) => (
          <div
            key={empresa.id}
            className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-600">
              {empresa.nome_fantasia}
            </h2>
            <p className="text-gray-700">CNPJ: {empresa.cnpj}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmpresaList;
