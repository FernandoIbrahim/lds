// models/alunos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const Usuario = require('../index'); // Importando o modelo Usuario

const Aluno = sequelize.define('Aluno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Usuario,
      key: 'id', 
    },
  },
  nome: {
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
      model: 'instituicoes_ensino', 
      key: 'id',
    },
  },
}, {
  tableName: 'alunos', 
});

Aluno.belongsTo(Usuario, { foreignKey: 'id' });

module.exports = Aluno;
