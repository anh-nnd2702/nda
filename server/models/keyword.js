const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');// Import đối tượng Sequelize đã cấu hình

const Keyword = sequelize.define(
    'Keyword', 
    {
    keywordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    keywordText: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    candId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'keyword',
    timestamps: false,
  }
);

module.exports = Keyword;