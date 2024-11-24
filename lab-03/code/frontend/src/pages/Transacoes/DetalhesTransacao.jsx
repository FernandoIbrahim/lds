import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDonate, FaShoppingCart, FaBitcoin } from "react-icons/fa";
import { useUserContext } from "../../hooks/UserContext";

function DetalhesTransacao() {
  const { id } = useParams();
  const { token, userId } = useUserContext(); 
  const [transacao, setTransacao] = useState(null);
  const [erro, setErro] = useState(null);
  const [vantagem, setVantagem] = useState(null);
  const [usuario1, setUsuario1] = useState(null);
  const [usuario2, setUsuario2] = useState(null);

  const fetchUsuario = async (id, setUsuario) => {
    let response1, response2, response3;
    try {
      response1 = await fetch(`http://localhost:3000/alunos/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      response2 = await fetch(`http://localhost:3000/professores/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      response3 = await fetch(`http://localhost:3000/empresas/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response1.ok || response2.ok || response3.ok) {
        const data1 = await response1.json();
        let data2 = null;
        if (response2.ok && response2.status !== 404) {
          data2 = await response2.json();
        }
        const data3 = await response3.json();
        let responseFinal;
  
        if (data1) responseFinal = data1;
        else if (data2) responseFinal = data2;
        else responseFinal = data3;
  
        if (responseFinal && responseFinal.usuario && responseFinal.usuario.email) {
          setUsuario(responseFinal.usuario.email);
        } else {
          throw new Error("Usuário não encontrado.");
        }
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
      const response = await fetch(`http://localhost:3000/transacao`, {
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
      const transacaoEncontrada = data.find((transacao) => transacao.id === parseInt(id));
      setTransacao(transacaoEncontrada);

      if (transacaoEncontrada) {
        await fetchUsuario(transacaoEncontrada.usuario2, setUsuario2);
        //setUsuario1(userId);
        await fetchUsuario(transacaoEncontrada.usuario1, setUsuario1);


        if (transacaoEncontrada.vantagem_id) {
          const vantagemResponse = await fetch(`http://localhost:3000/vantagens/${transacaoEncontrada.vantagem_id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (vantagemResponse.ok) {
            const vantagemData = await vantagemResponse.json();
            setVantagem(vantagemData);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar as transações:", error);
      setErro(error.message);
    }
  };

  useEffect(() => {
    fetchTransacao();
  }, [id, token, userId]);

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
