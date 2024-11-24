import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContext";
import { FaGift } from "react-icons/fa";

function AlunoList() {
  const { userType, token, setMudar, mudar } = useUserContext();
  const [alunos, setAlunos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [valorDoacao, setValorDoacao] = useState("");
  const [justificativa, setJustificativa] = useState(""); // Novo estado para justificativa
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

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
    fetchAlunos();
  }, [mudar]);

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleDoar = async () => {
    if (valorDoacao <= 0 || !justificativa || !alunoSelecionado) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/transacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tipo: "doacao",
          receptorUserId: alunoSelecionado.usuario.id,
          valor: parseInt(valorDoacao),
          desc: justificativa,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer a doação");
      }

      setValorDoacao("");
      setJustificativa(""); // Limpar o estado da justificativa
      setShowModal(false);
      alert("Doação realizada com sucesso!");
      setMudar(mudar + 1);
    } catch (error) {
      console.error("Erro ao doar:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6">Lista de Alunos</h1>
      <input
        type="text"
        placeholder="Buscar por Nome"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border border-blue-500 rounded-lg p-3 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {alunosFiltrados.map((aluno) => (
          <div
            key={aluno.id}
            className="bg-white border-2 border-blue-200 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <div className="flex items-center p-4 space-x-4">
              <img
                src={`https://ui-avatars.com/api/?name=${aluno.nome}&background=random`}
                alt={aluno.nome}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-blue-600 line-clamp-2">{aluno.nome}</h2>
                <p className="text-gray-700"><strong>Curso:</strong> {aluno.curso}</p>
                <p className="text-gray-700"><strong>ID do Usuário:</strong> {aluno.usuario.id}</p>
                <p className="text-gray-700"><strong>Pontos:</strong> {aluno.usuario.pontos}</p>
              </div>
            </div>

            {userType === "professor" && (
              <div
                className="flex items-center justify-between p-4 border-t border-blue-200 cursor-pointer"
                onClick={() => {
                  setAlunoSelecionado(aluno);
                  setShowModal(true);
                }}
              >
                <div className="flex items-center text-green-600">
                  <FaGift className="text-2xl" />
                  <span className="ml-2">Doar Moedas</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Doação de Moedas</h2>
            <p className="mb-4">Você está doando para: <strong>{alunoSelecionado?.nome}</strong></p>
            <input
              type="number"
              placeholder="Valor da Doação"
              value={valorDoacao}
              onChange={(e) => setValorDoacao(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            />
            <input
              type="text"
              placeholder="Justificativa"
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleDoar}
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Doar
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

export default AlunoList;
