const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');// Import đối tượng Sequelize đã cấu hình
const CV = require('./CV');

const CVProject = sequelize.define(
  'CVProject',
  {
    prjId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    prjName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cvId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    prjPosition: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    prjDescribe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'cvproject',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

// Định nghĩa mối quan hệ giữa CVProject và CV


module.exports = CVProject;
