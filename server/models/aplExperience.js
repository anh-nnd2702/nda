const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');

const AplExperience = sequelize.define('AplExperience', {
  expId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  applyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  position: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE
  },
  experDescribe: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'aplexperience',
  timestamps: false
});

module.exports = AplExperience;
