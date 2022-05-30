const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "quotation_likes",
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "quotation_likes",
      timestamps: true,
      indexes: [
        {
          name: "fk_quotation_has_user_user1_idx",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "fk_quotation_has_user_quotation1_idx",
          using: "BTREE",
          fields: [{ name: "quotation_id" }],
        },
      ],
    }
  );
};
