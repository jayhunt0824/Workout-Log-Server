require("dotenv").config();
let express = require("express");
let app = express();

let log = require("./controllers/logcontroller");
let user = require("./controllers/usercontroller");

const sequelize = require("./db");

sequelize.sync();
// sequelize.sync({ force: true });

app.use(require("./middleware/headers"));

app.use(express.json()); //middleware function.

app.use("/user", user);

app.use("/log", log);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});

// let express = require("express");
// let app = express();
// let sequelize = require("./db");

// let log = require("./controllers/logcontroller");
// let user = require("./controllers/usercontroller");

// sequelize.sync();
// //sequelize.sync({force:true})
// app.use(express.json()); //middleware function. Tells the app that we want json to be used as we process this request and all requests underneath so must be on top.

// //use() creates a route to access any future functions in our usercontroller.js. User specifies which controller this endpoint is connected to.
// app.use("/log", log);
// app.use("/user", user);

// app.listen(3000, function () {
//   console.log("App is listening on port 3000");
// });
