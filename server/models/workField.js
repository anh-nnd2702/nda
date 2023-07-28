const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js'); // Import đối tượng Sequelize đã cấu hình

const WorkField = sequelize.define(
  'WorkField',
  {
    workFieldId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    workFieldName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'workfield',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

module.exports = WorkField;
