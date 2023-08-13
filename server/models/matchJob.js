const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js'); // Import đối tượng Sequelize đã cấu hình

const MatchJob = sequelize.define(
  'MatchJob',
  {
    matchId: {
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
    matchStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    tableName: 'matchjob',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

// Tạo quan hệ Many-to-One với model Job


module.exports = MatchJob;
