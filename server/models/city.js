const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');// Import đối tượng Sequelize đã cấu hình

const City = sequelize.define(
  'City',
  {
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cityName: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
  },
  {
    tableName: 'city',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

module.exports = City;
