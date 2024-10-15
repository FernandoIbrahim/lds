// models/transacao.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Certifique-se de que o caminho está correto
const Usuario = require('./usuario'); // Importando o modelo Usuario
const Vantagem = require('./vantagem'); // Importando o modelo Vantagens

const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto incrementa o id
  },
  tipo: {
    type: DataTypes.ENUM('compra', 'doacao'), // Define os valores possíveis para o tipo
    allowNull: false, // O tipo não pode ser nulo
  },
  usuario1: {
    type: DataTypes.INTEGER,
    allowNull: false, // O primeiro usuário não pode ser nulo
    references: {
      model: Usuario, // Referência ao modelo Usuario
      key: 'id', // Chave que será usada para a referência
    },
  },
  usuario2: {
    type: DataTypes.INTEGER,
    allowNull: false, // O segundo usuário não pode ser nulo
    references: {
      model: Usuario, // Referência ao modelo Usuario
      key: 'id', // Chave que será usada para a referência
    },
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false, // A data não pode ser nula
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false, // O valor não pode ser nulo
  },
  vantagem_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // A vantagem vinculada pode ser nula
    references: {
      model: Vantagem, // Referência ao modelo Vantagens
      key: 'id', // Chave que será usada para a referência
    },
  },
}, {
  tableName: 'transacoes', // Nome da tabela no banco de dados
});

// Associações
Transacao.belongsTo(Usuario, { foreignKey: 'usuario1', targetKey: 'id', onDelete: 'CASCADE' });
Transacao.belongsTo(Usuario, { foreignKey: 'usuario2', targetKey: 'id', onDelete: 'CASCADE' });
Transacao.belongsTo(Vantagem, { foreignKey: 'vantagem_id', targetKey: 'id', onDelete: 'SET NULL' }); // Vínculo a uma vantagem

// Exporta o modelo
module.exports = Transacao;
