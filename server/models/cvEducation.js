const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js'); // Import đối tượng Sequelize đã cấu hình
const CV = require('./CV');
const EducationLevel = require('./EducationLevel');

const CVEducation = sequelize.define(
  'CVEducation',
  {
    eduId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    schoolName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cvId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    major: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    eduLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    eduDescribe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'cveducation',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

// Định nghĩa mối quan hệ giữa CVEducation và CV

module.exports = CVEducation;
