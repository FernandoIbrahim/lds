import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação programática
import { useUserContext } from '../../hooks/UserContext';

function CadastroEmpresa() {
  const { setUserId, setUserType } = useUserContext(); // Usa o contexto

  const [nomeFantasia, setNomeFantasia] = useState("");
  const [email, setEmail] = useState(""); // Novo estado para o email
  const [senha, setSenha] = useState(""); // Novo estado para a senha
  const [cnpj, setCnpj] = useState(""); // Novo estado para o CNPJ
  const navigate = useNavigate(); // Hook para navegação

  const handleCadastro = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const empresaData = {
      nome_fantasia: nomeFantasia,
      email,
      senha,
      cnpj,
    };

    try {
      // Faz a requisição para criar a empresa
      const response = await fetch("http://localhost:3000/empresas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empresaData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar empresa");
      }

      const createdEmpresa = await response.json(); // Recebe a empresa criada da resposta
      console.log("Empresa criada:", createdEmpresa); // Log da empresa criada

      setUserId(createdEmpresa.id);
      setUserType('empresa');
      alert("Empresa cadastrada com sucesso!"); // Alerta de sucesso
      navigate("/pagina-inicial"); // Redireciona para a página de sucesso

    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);
      alert("Erro ao cadastrar empresa. Tente novamente."); // Alerta de erro
      navigate('/cadastro-empresa')

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Cadastro Empresa</h1>
        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomeFantasia">
              Nome Fantasia
            </label>
            <input
              type="text"
              id="nomeFantasia"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cnpj">
              CNPJ
            </label>
            <input
              type="text"
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroEmpresa;
