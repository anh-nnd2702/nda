const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js'); // Import đối tượng Sequelize đã cấu hình

const AdminAcc = sequelize.define(
  'AdminAcc',
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    adminEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    adminPass: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'adminacc',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

module.exports = AdminAcc;
