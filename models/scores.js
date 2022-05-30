const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "scores",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "product",
          key: "id",
        },
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "scores",
      timestamps: true,
      indexes: [
        {
          name: "fk_user_has_product_product1_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
        {
          name: "fk_user_has_product_user1_idx",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
