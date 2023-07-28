const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');

const AplProject = sequelize.define('AplProject', {
  prjId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  applyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prjName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  teamSize: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE
  },
  prjPosition: {
    type: DataTypes.STRING(100)
  },
  prjDescribe: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'aplproject',
  timestamps: false
});

module.exports = AplProject;
