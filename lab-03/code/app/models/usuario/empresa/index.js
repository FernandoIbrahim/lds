// models/empresas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const Usuario = require('../index'); 

const Empresa = sequelize.define('Empresa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    references: {
      model: Usuario,
      key: 'id', 
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

Empresa.belongsTo(Usuario, { foreignKey: 'id' });
// Exporta o modelo
module.exports = Empresa;
