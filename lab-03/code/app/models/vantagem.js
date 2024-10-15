// models/vantagens.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Certifique-se de que o caminho está correto
const Empresa = require('./empresa'); // Importando o modelo Empresas

const Vantagem = sequelize.define('Vantagens', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT, 
    allowNull: false, 
  },
  foto: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  preco: {
    type: DataTypes.DOUBLE, 
    allowNull: false, 
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
}, {
  tableName: 'vantagens',
});

// Associações
Vantagem.belongsTo(Empresa, {
  foreignKey: 'empresa_id', 
  targetKey: 'id',
  onDelete: 'CASCADE', 
});

// Exporta o modelo
module.exports = Vantagem;
