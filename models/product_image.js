const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "product_image",
    {
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
      },
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "product_image",
      timestamps: true,
      indexes: [
        {
          name: "fk_product_image_product1_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  );
};
