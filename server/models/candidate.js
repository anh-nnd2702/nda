const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');

const Candidate = sequelize.define('Candidate', {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(30)
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'City',
      key: 'cityId'
    }
  },
  gender: {
    type: DataTypes.TINYINT(2)
  },
  dateOfBirth: {
    type: DataTypes.DATE
  },
  address: {
    type: DataTypes.STRING(255)
  },
  isSeeking: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  isAcceptEmail: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  minWage: {
    type: DataTypes.INTEGER
  },
  workFieldId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'WorkField',
      key: 'workFieldId'
    }
  },
  experience: {
    type: DataTypes.INTEGER
  },
  workLevelId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'WorkLevel',
      key: 'workLevelId'
    }
  },
  jobTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'JobType',
      key: 'jobTypeId'
    }
  }
}, {
  tableName: 'Candidates',
  timestamps: false,
});

module.exports = Candidate;
