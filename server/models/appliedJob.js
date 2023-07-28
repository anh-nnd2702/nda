const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');

const AppliedJob = sequelize.define(
  'AppliedJob',
  {
    applyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    coverLetter: {
      type: DataTypes.TEXT,
      collate: 'utf8mb4_unicode_ci'
    },
    applyTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    applyStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    candId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING(255),
      collate: 'utf8mb4_unicode_ci'
    },
    cvIntro: {
      type: DataTypes.TEXT,
      allowNull: false,
      collate: 'utf8mb4_unicode_ci'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      collate: 'utf8mb4_unicode_ci'
    },
    cvImgUrl: {
      type: DataTypes.STRING(255),
      collate: 'utf8mb4_unicode_ci'
    },
    gender: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    externalLink: {
      type: DataTypes.STRING(255),
      collate: 'utf8mb4_unicode_ci'
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      collate: 'utf8mb4_unicode_ci'
    }
  }, {
  tableName: 'appliedjob',
  timestamps: false
});

module.exports = AppliedJob;
