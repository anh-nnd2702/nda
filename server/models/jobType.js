const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');// Import đối tượng Sequelize đã cấu hình

const JobType = sequelize.define(
  'JobType',
  {
    jobTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    jobTypeName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'jobtype',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

module.exports = JobType;
