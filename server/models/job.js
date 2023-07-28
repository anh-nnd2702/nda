const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');
const Company = require('./company.js');

const Job = sequelize.define('Job', {
  jobId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  jobTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Company,
      key: 'Id',
    },
  },
  workAddress: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  modifiedTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jobDescribe: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  jobRequire: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  jobBenefit: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  eduLevelId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jobTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  expireDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  genderRequire: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  workLevelId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  minWage: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  maxWage: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  hireCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  workFieldId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'job',
  timestamps: false
});

module.exports = Job;
