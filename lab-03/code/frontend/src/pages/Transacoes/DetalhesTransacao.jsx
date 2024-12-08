import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDonate, FaShoppingCart, FaBitcoin } from "react-icons/fa";
import { useUserContext } from "../../hooks/UserContext";
import { getTransacao } from "../../services/transacao";
import { getAluno } from "../../services/aluno";
import { getProfessor } from "../../services/professor";
import { getEmpresa } from "../../services/empresa";

function DetalhesTransacao() {
  const { id } = useParams();
  const { userType } = useUserContext(); 
  const [transacao, setTransacao] = useState(null);
  const [erro, setErro] = useState(null);
  const [vantagem, setVantagem] = useState(null);
  const [usuario1, setUsuario1] = useState(null);
  const [usuario2, setUsuario2] = useState(null);

  const fetchUsuario = async (id, setUsuario) => {
    try {
      let data;
      if (userType === 'aluno') {
        data = await getAluno(id);
      } else if (userType === 'professor') {
        data = await getProfessor(id);
      } else {
        data = await getEmpresa(id);
      }
  
      if (data.usuario && data.usuario.email) {
        setUsuario(data.usuario.email);
      } else {
        throw new Error("Usuário não encontrado.");
      }

    } catch (error) {
      console.error("Erro ao buscar o usuário:", error);
      setErro(error.message);
    }
  };
  
  const fetchTransacao = async () => {
    try {
      const data = await getTransacao(id);
      setTransacao(data);

      if (data) {
        await fetchUsuario(data.usuario2, setUsuario2);
        //setUsuario1(userId);
        await fetchUsuario(data.usuario1, setUsuario1);


        if (data.vantagem) {
          setVantagem(data.vantagem);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar as transações:", error);
      setErro(error.message);
    }
  };

  useEffect(() => {
    fetchTransacao();
  }, [id]);

  if (erro) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
        {erro}
      </div>
    );
  }

  if (!transacao) {
    return <div className="text-center text-lg text-gray-500">Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-start min-h-screen bg-gray-50 p-8 text-left">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Detalhes da Transação</h1>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">
        <div className="flex items-center mb-6 space-x-4">
          {transacao.tipo === "doacao" ? (
            <FaDonate className="text-red-500 text-4xl" />
          ) : (
            <FaShoppingCart className="text-blue-500 text-4xl" />
          )}
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {transacao.tipo.charAt(0).toUpperCase() + transacao.tipo.slice(1)} - R$
              {transacao.valor.toFixed(2)}{" "}
              <span className="text-yellow-500 ml-3">
                <FaBitcoin />
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Data: {new Date(transacao.data).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-700">Usuários Involvidos</h3>
            <p className="text-gray-600">
              <strong>De:</strong> {usuario1 ? `${usuario1}` : "Carregando..."}
            </p>
            <p className="text-gray-600">
              <strong>Para:</strong> {usuario2 ? `${usuario2}` : "Carregando..."}
            </p>
          </div>

          {transacao.desc && (
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Descrição</h3>
              <p className="text-gray-600">{transacao.desc}</p>
            </div>
          )}

          {vantagem && (
            <div className="flex items-start space-x-7">
            <div className="flex-shrink-0">
              <img
                src={vantagem.foto} 
                alt={vantagem.nome}
                className="w-60 h-60 object-cover rounded-lg aspect-square"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-700">Vantagem</h3>
              <p className="text-gray-600"><strong>Nome:</strong> {vantagem.nome}</p>
              <p className="text-gray-600"><strong>Descrição:</strong> {vantagem.desc}</p>
              <p className="text-gray-600"><strong>Preço:</strong> R$ {vantagem.preco.toFixed(2)}</p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-lg text-gray-700">Empresa Associada</h4>
                <p className="text-gray-600"><strong>Nome da Empresa:</strong> {vantagem.Empresa.nome_fantasia}</p>
                <p className="text-gray-600"><strong>CNPJ:</strong> {vantagem.Empresa.cnpj}</p>
              </div>
            </div>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalhesTransacao;
