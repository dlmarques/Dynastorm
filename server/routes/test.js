const router = require("express").Router();

router.get("/get", (req, res) => {
  res.send("success");
});

module.exports = router;