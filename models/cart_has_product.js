const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "cart_has_product",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "cart",
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
    },
    {
      sequelize,
      tableName: "cart_has_product",
      timestamps: true,
      indexes: [
        {
          name: "fk_cart_has_product_product1_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
        {
          name: "fk_cart_has_product_cart1_idx",
          using: "BTREE",
          fields: [{ name: "cart_id" }],
        },
      ],
    }
  );
};
