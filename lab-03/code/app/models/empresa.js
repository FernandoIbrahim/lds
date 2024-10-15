// models/empresas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./usuario'); // Importando o modelo Usuario

const Empresa = sequelize.define('Empresa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // A chave primária deve ser verdadeira
    references: {
      model: Usuario,
      key: 'id', // Referenciando o id do modelo Usuario
    },
  },
  nome_fantasia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'empresas', // Nome da tabela
});

// Exporta o modelo
module.exports = Empresa;
