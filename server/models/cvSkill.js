const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');// Import đối tượng Sequelize đã cấu hình

const CVSkill = sequelize.define(
  'CVSkill',
  {
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cvId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skillName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    skillLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skillDescribe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'cvskill',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

// Định nghĩa mối quan hệ giữa CVSkill và CV

module.exports = CVSkill;
