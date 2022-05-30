const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "quotation",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: "Cotización",
      },
      description: {
        type: DataTypes.STRING(140),
        allowNull: true,
        defaultValue: "Sin Descripción",
      },
    },
    {
      sequelize,
      tableName: "quotation",
      timestamps: true,
      indexes: [
        {
          name: "fk_quotation_user1_idx",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
