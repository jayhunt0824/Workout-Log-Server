let express = require("express"); //this instance becomes our gateway to using Express methods
let router = express.Router(); //returns a router object for us

let validateSession = require("../middleware/validate-session");
const Log = require("../db").import("../models/log");

router.post("/", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  };
  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
  Log.findAll()
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", validateSession, (req, res) => {
  let id = req.params.id;
  Log.findAll({
    where: { id: id },
  })
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/:id", validateSession, (req, res) => {
  const updateLogEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  };
  const query = { where: { id: req.params.id } };

  Log.update(updateLogEntry, query)
    .then((animals) => res.status(200).json(animals))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Log.destroy(query)
    .then((response) =>
      res.status(200).json({
        message: "Log Entry Removed",
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
