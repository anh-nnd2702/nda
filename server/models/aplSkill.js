const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');

const AplSkill = sequelize.define('AplSkill', {
  skillId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  applyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  skillName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  skillLevel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  skillDescribe: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'aplskill',
  timestamps: false
});

module.exports = AplSkill;
