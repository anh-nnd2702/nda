const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js'); // Import đối tượng Sequelize đã cấu hình

const ReportJob = sequelize.define(
  'ReportJob',
  {
    reportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    candId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reportDescribe: {
      type: DataTypes.TEXT,
    },
    reportTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reportStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'reportjob',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

// Tạo quan hệ Many-to-One với model Job

module.exports = ReportJob;
