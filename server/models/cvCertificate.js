const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js'); // Import đối tượng Sequelize đã cấu hình

const CVCertificate = sequelize.define(
  'CVCertificate',
  {
    certId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cvId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    certTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    certDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    certDescribe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'cvcertificate',
    timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
  }
);

// Định nghĩa mối quan hệ giữa CVCertificate và CV


module.exports = CVCertificate;
