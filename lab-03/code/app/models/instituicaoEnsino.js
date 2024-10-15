// models/instituicoesEnsino.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Certifique-se de que o caminho está correto

const InstituicoesEnsino = sequelize.define('InstituicoesEnsino', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Incrementa automaticamente
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // CNPJ deve ser único
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'instituicoes_ensino', // Nome da tabela no banco de dados
});

// Exporta o modelo
module.exports = InstituicoesEnsino;
