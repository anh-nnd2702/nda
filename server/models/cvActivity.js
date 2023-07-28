const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js'); 

const CVActivity = sequelize.define(
  'CVActivity',
  {
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cvId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activityName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    activityDescribe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'cvactivity',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

module.exports = CVActivity;
