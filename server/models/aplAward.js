const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js'); 

const AplAward = sequelize.define('AplAward', {
  awardId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  awardTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  applyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  organization: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  awardYear: {
    type: DataTypes.INTEGER(4),
    allowNull: false
  },
  awardDescribe: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'aplaward',
  timestamps: false
});


module.exports = AplAward;
