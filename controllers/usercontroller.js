const user = require("../models/user");
const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  User.create({
    username: req.body.user.username,
    passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 10),
  })
    .then(function createSuccess(user) {
      //.sign is where we create token, takes payload and signature
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        //returns code as an object in postman
        user: user, //create a user object in our response and set value to user parameter. user after the colon is the parameter from our createSuccess() function.
        message: "User successfully created",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(function registerSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.user.passwordhash,
          user.passwordhash,
          (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });

              res.status(200).json({
                user: user, //object
                message: "User successfully logged in",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login failed" });
            }
          }
        );
      } else {
        res.status(500).json({ error: "User does not exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err })); //if rejected we send the error back in the response
});

module.exports = router;
