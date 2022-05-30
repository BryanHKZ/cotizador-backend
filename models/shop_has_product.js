const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "shop_has_product",
    {
      shop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "shop",
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "shop_has_product",
      timestamps: true,
      indexes: [
        {
          name: "fk_shop_has_product_product1_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
        {
          name: "fk_shop_has_product_shop1_idx",
          using: "BTREE",
          fields: [{ name: "shop_id" }],
        },
      ],
    }
  );
};
