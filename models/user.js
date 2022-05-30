const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      profilePhoto: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user",
      timestamps: true,
      indexes: [],
    }
  );
};
