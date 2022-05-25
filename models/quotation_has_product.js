const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "quotation_has_product",
    {
      quotation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "quotation",
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
      tableName: "quotation_has_product",
      timestamps: true,
      indexes: [
        {
          name: "fk_quotation_has_product_product1_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
        {
          name: "fk_quotation_has_product_quotation1_idx",
          using: "BTREE",
          fields: [{ name: "quotation_id" }],
        },
      ],
    }
  );
};
