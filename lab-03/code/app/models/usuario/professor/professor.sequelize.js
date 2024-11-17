// models/professores.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const Usuario = require('../usuario.sequelize'); // Importando o modelo Usuario

const Professor = sequelize.define('Professor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // A chave primária deve ser verdadeira
    references: {
      model: Usuario,
      key: 'id', // Referenciando o id do modelo Usuario
    },
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  materia: {
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
  tableName: 'professores', // Nome da tabela
});

Professor.belongsTo(Usuario, { foreignKey: 'id' });

module.exports = Professor;
