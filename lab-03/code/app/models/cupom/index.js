const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize'); 
const Vantagem = require('../vantagem'); // Importando o modelo Vantagem

// Definição do modelo `Cupom`
const Cupom = sequelize.define('Cupom', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, // Campo obrigatório
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false, // Campo obrigatório
    unique: true, // Garante que cada código seja único
  },
  vantagem_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Pode ser nulo, se necessário
    references: {
      model: Vantagem, // Relaciona com a tabela vantagens
      key: 'id',
    },
  },
}, {
  tableName: 'cupons', // Nome da tabela no banco de dados
  timestamps: false, // Desativa as colunas `createdAt` e `updatedAt`
});

// Associações
Cupom.belongsTo(Vantagem, { foreignKey: 'vantagem_id', targetKey: 'id', onDelete: 'SET NULL' });

module.exports = Cupom;
