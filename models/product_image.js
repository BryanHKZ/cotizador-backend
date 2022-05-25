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
    },
    {
      sequelize,
      tableName: "product_image",
      timestamps: true,
      indexes: [],
    }
  );
};
