const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');

const Company = sequelize.define('company', {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING(255),
    unique: true,
  },
  companyAddress: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  companyIntro: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  companyPhone: {
    type: DataTypes.STRING(30),
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  companyLogo: {
    type: DataTypes.BLOB('long'),
    defaultValue: null,
  },
  companyLink: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  companyPass: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  companyLicense: {
    type: DataTypes.BLOB('long'),
    defaultValue: null,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cityId: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'company',
  timestamps: false,
});

module.exports = Company;
