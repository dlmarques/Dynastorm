const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const schedule = require("node-schedule");

schedule.scheduleJob("0 0 * * *", async () => {
  const users = await User.find();
  users.map(async (user) => {
    await User.findByIdAndUpdate(user._id, { $set: { hp: 100 } });
  });
});

router.patch("/heal", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const user = await User.findById(id);
  const health = user.hp;
  const heal = req.body.heal;

  if (user && heal) {
    if (health + heal >= 100) {
      await User.findByIdAndUpdate(id, {
        $set: { hp: 100, money: user.money - req.body.price },
      });
      res.send("100");
    } else {
      await User.findByIdAndUpdate(id, {
        $set: { hp: health + heal, money: user.money - req.body.price },
      });
      res.send("any");
    }
  }
});

module.exports = router;
