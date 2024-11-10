import React, { useState } from "react";

function Modal({ isOpen, onClose, onSubmit }) {
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [foto, setFoto] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaVantagem = {
      nome,
      desc,
      foto,
      preco: parseFloat(preco),
    };

    onSubmit(novaVantagem); // Chama a função de submissão passando os dados do formulário
    onClose(); // Fecha o modal após o envio
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Cadastrar Vantagem</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Descrição:</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Foto (URL):</label>
              <input
                type="text"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Preço:</label>
              <input
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Fechar
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
