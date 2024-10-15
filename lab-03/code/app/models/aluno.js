// models/alunos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./usuario'); // Importando o modelo Usuario

const Aluno = sequelize.define('Aluno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // A chave primária deve ser verdadeira
    references: {
      model: Usuario,
      key: 'id', // Referenciando o id do modelo Usuario
    },
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instituicao_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'instituicoes_ensino', // O nome da tabela no plural
      key: 'id',
    },
  },
}, {
  tableName: 'alunos', // Nome da tabela
});

// Exporta o modelo
module.exports = Aluno;
