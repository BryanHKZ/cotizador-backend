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
      description: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
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
          name: "fk_product_category1_idx",
          using: "BTREE",
          fields: [{ name: "category_id" }],
        },
      ],
    }
  );
};
