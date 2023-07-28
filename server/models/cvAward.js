const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnect.js');

const CVAward = sequelize.define(
    'CvAward',
    {
        awardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        cvId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        awardTitle: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        organization: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        awardYear: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: true,
                min: 1901, // Năm tối thiểu
                max: 2155, // Năm tối đa
            },
            allowNull: false
        },
        awardDescribe: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'cvaward',
        timestamps: false, // Tắt các trường timestamps (createdAt, updatedAt)
    }
);

// Định nghĩa mối quan hệ giữa CVCertificate và CV


module.exports = CVAward;
