const { DataTypes } = require('sequelize');
const {sequelize} = require('../dbconnect.js');
const Candidate = require("./candidate.js")
const Avatar = sequelize.define(
    "Avatar",
    {
      candId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      avatarUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "avatar",
      timestamps: false,
    }
  );

  module.exports = Avatar;