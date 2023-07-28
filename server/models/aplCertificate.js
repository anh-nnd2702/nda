const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');

const AplCertificate = sequelize.define('AplCertificate', {
  certId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  applyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  certTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  organization: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  certDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expireDate: {
    type: DataTypes.DATE
  },
  certDescribe: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'aplcertificate',
  timestamps: false
});

module.exports = AplCertificate;
