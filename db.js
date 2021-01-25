const Sequelize = require("sequelize");
const sequelize = new Sequelize("WOL", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to WOL postgres database");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
