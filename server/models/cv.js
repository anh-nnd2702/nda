const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');

const Cv = sequelize.define(
  'Cv',
  {
    cvId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cvTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    candId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cvPosition: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    workFieldId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cvIntro: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    modifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      defaultValue:0,
    },
    isMainCv: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cvImgUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    gender: {
      type: DataTypes.TINYINT(2),
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    externalLink:{
      type: DataTypes.STRING(255),
      defaultValue: null
    }
  },
  {
    tableName: 'cv',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

// Kết nối quan hệ với bảng Candidates

//Cv.hasMany(AppliedJob, { foreignKey: 'cvId', as: 'AppliedJobs' });

module.exports = Cv;
