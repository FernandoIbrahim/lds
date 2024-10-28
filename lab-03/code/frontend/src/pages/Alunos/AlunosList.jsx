import React, { useEffect, useState } from "react";

function AlunoList() {
  const [alunos, setAlunos] = useState([]); // Estado para armazenar alunos
  const [filtro, setFiltro] = useState(""); // Estado para o filtro

  // Função para buscar os alunos
  const fetchAlunos = async () => {
    try {
      const response = await fetch("http://localhost:3000/alunos");
      if (!response.ok) {
        throw new Error("Erro ao buscar alunos");
      }
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  useEffect(() => {
    fetchAlunos(); // Chama a função ao montar o componente
  }, []);

  // Filtra os alunos com base no nome
  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Lista de Alunos</h1>
      {/* Barra de Pesquisa */}
      <input
        type="text"
        placeholder="Buscar por Nome"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)} // Atualiza o filtro
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {alunosFiltrados.map((aluno) => (
          <div
            key={aluno.id}
            className="bg-blue-50 border-2 border-blue-300 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-600">
              {aluno.nome}
            </h2>
            
            <p className="text-gray-700"><strong>Curso:</strong>  {aluno.curso}</p>
            {/* Exibe o ID e os pontos do usuário */}
            <p className="text-gray-700"><strong>ID do Usuário: </strong>{aluno.usuario.id}</p>
            <p className="text-gray-700"><strong>Pontos:</strong> {aluno.usuario.pontos}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlunoList;
