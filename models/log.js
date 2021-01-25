// const journal = require("../../../../05-Node-Server/server/models/journal");

module.exports = function (sequelize, DataTypes) {
  const log = sequelize.define("log", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    definition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
    },
  });
  return log;
};
