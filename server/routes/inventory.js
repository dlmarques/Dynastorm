const router = require("express").Router();
const Inventory = require("../models/Inventory");
const jwt = require("jsonwebtoken");
const { saveItemValidation } = require("../utils/validation");

//Add item
router.post("/addItem", async (req, res) => {
  //Validate data before we a user
  const { error } = saveItemValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);

  try {
    //Create new item
    const newItem = new Inventory({
      id: id,
      itemName: req.body.itemName,
      itemSkill: req.body.itemSkill,
      quantity: req.body.quantity,
    });
    await newItem.save();
    res.send("success");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
