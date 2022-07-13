const router = require("express").Router();
const Inventory = require("../models/Inventory");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { saveItemValidation } = require("../utils/validation");

//Add item
router.post("/addItem", async (req, res) => {
  //Validate data before we a user
  const { error } = saveItemValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const item = await Inventory.findOne({ itemName: req.body.itemName });
  const user = await User.findOne({ _id: id });

  if (item && req.body.itemName === item.itemName) {
    await Inventory.findOneAndUpdate(
      { itemName: req.body.itemName },
      { $set: { quantity: item.quantity + req.body.quantity } }
    );
    if (user) {
      await User.findOneAndUpdate(
        { _id: id },
        { $set: { money: user.money - req.body.price } }
      );
      const percentage = req.body.percentage;
      if (req.body.itemSkill === "magic") {
        await User.findOneAndUpdate(
          { _id: id },
          { $set: { magic: user.magic + user.magic * percentage } }
        );
      } else if (req.body.itemSkill === "speed") {
        await User.findOneAndUpdate(
          { _id: id },
          { $set: { speed: user.speed + user.speed * percentage } }
        );
      } else if (req.body.itemSkill === "stamina") {
        await User.findOneAndUpdate(
          { _id: id },
          { $set: { stamina: user.stamina + user.stamina * percentage } }
        );
      } else if (req.body.itemSkill === "strength") {
        await User.findOneAndUpdate(
          { _id: id },
          { $set: { strength: user.strength + user.strength * percentage } }
        );
      } else {
        res.send("error");
      }
      res.send("inserted");
    }
  } else {
    try {
      //Create new item
      const newItem = new Inventory({
        id: id,
        itemName: req.body.itemName,
        itemSkill: req.body.itemSkill,
        quantity: req.body.quantity,
      });
      await newItem.save();
      if (user) {
        await User.findOneAndUpdate(
          { _id: id },
          { $set: { money: user.money - req.body.price } }
        );
        const percentage = req.body.percentage;
        if (req.body.itemSkill === "magic") {
          await User.findOneAndUpdate(
            { _id: id },
            { $set: { magic: user.magic + user.magic * percentage } }
          );
        } else if (req.body.itemSkill === "speed") {
          await User.findOneAndUpdate(
            { _id: id },
            { $set: { speed: user.speed + user.speed * percentage } }
          );
        } else if (req.body.itemSkill === "stamina") {
          await User.findOneAndUpdate(
            { _id: id },
            { $set: { stamina: user.stamina + user.stamina * percentage } }
          );
        } else if (req.body.itemSkill === "strength") {
          await User.findOneAndUpdate(
            { _id: id },
            { $set: { strength: user.strength + user.strength * percentage } }
          );
        } else {
          res.send("error");
        }
        res.send("inserted");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

module.exports = router;
