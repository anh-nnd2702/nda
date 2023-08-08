const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js'); // Import đối tượng Sequelize đã cấu hình
const Job = require('../models/job.js');
const Candidate = require('../models/candidate.js')

const SavedJob = sequelize.define(
  'SavedJob',
  {
    savedJobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    candId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    savedTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'savedjob',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);


module.exports = SavedJob;
