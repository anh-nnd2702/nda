const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');// Import đối tượng Sequelize đã cấu hình

const EducationLevel = sequelize.define(
  'EducationLevel',
  {
    eduLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    eduLevelName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'educationlevel',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

module.exports = EducationLevel;
