const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "product",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      shop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "shop",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "product",
      timestamps: true,
      indexes: [
        {
          name: "fk_product_shop1_idx",
          using: "BTREE",
          fields: [{ name: "shop_id" }],
        },
      ],
    }
  );
};
