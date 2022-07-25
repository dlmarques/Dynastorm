const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.patch("/setPerk", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (user) {
    let skill;
    if (req.body.perk === "strength") {
      skill = user.strength;
      const increaseSkill = await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { strength: skill + skill * 0.5 } }
      );
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { new: false } }
      );
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { perk: "strength" } }
      );
      res.send(increaseSkill);
    } else if (req.body.perk === "magic") {
      skill = user.magic;
      const increaseSkill = await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { magic: skill + skill * 0.5 } }
      );
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { new: false } }
      );
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { perk: "magic" } }
      );
      res.send(increaseSkill);
    } else if (req.body.perk === "magicResist") {
      skill = user.magicResist;
      const increaseSkill = await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { magicResist: skill + skill * 0.5 } }
      );
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { new: false } }
      );
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { perk: "magicResist" } }
      );
      res.send(increaseSkill);
    }
  }
});

module.exports = router;
