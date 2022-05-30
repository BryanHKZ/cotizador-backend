const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "product_has_tag",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "product",
          key: "id",
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "tag",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "product_has_tag",
      timestamps: true,
      indexes: [
        {
          name: "fk_product_has_tag_tag1_idx",
          using: "BTREE",
          fields: [{ name: "tag_id" }],
        },
        {
          name: "fk_product_has_tag_product1_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  );
};
