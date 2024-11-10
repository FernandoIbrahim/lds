import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/UserContext"; // Importando seu contexto

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { setUserId, setUserType, setToken } = useUserContext(); // Desestruturando as funções do contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Enviar requisição POST para o backend usando fetch
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        throw new Error("Email ou senha inválidos.");
      }

      const data = await response.json();

      // Desestruturando a resposta
      const { token, usuario, tipoUser } = data;

      // Definindo os valores no contexto conforme o retorno da requisição
      setUserId(usuario.id);
      setToken(token);
      setUserType(tipoUser); // Definindo o tipo de usuário como "empresa" por padrão
      console.log(tipoUser)
      // Redirecionando para a página inicial após o login
      navigate("/pagina-inicial");
    } catch (err) {
      // Exibindo erro se falhar
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login - Sistema de Moedas</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
