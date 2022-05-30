const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "notification",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      data: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      viewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "notification",
      timestamps: true,
      indexes: [
        {
          name: "fk_notification_user_idx",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
