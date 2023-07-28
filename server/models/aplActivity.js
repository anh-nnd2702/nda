const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');

const AplActivity = sequelize.define('AplActivity', {
  activityId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  applyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activityName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  organization: {
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
  activityDescribe: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'aplactivity',
  timestamps: false
});

module.exports = AplActivity;
