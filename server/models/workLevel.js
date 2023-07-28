const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect'); // Import đối tượng Sequelize đã cấu hình

const WorkLevel = sequelize.define(
  'WorkLevel',
  {
    workLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    workLevelName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'worklevel',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

module.exports = WorkLevel;
