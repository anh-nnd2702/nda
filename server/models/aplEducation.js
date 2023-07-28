const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');

const AplEducation = sequelize.define('AplEducation', {
  eduId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  schoolName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  applyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  major: {
    type: DataTypes.STRING(255)
  },
  eduLevelId: {
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
  eduDescribe: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'apleducation',
  timestamps: false
});

module.exports = AplEducation;
