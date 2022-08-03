const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Notification = require("../models/Notification");

router.post("/getAllUsers", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const allUsers = await User.find();
  const currentUser = await User.findById(id);
  try {
    const users = allUsers
      .filter((user) => {
        return user.username !== currentUser.username;
      })
      .filter((user) => user.hp > 0)
      .filter((user) => {
        const averageSkills = user.strength + user.magic + user.armor + user.magicResist;
        const userAverageSkills = currentUser.strength + currentUser.magic + currentUser.armor + currentUser.magicResist;
        return averageSkills < userAverageSkills + (userAverageSkills * 0.5) && averageSkills > userAverageSkills - (userAverageSkills * 0.5)
      })
      .map((user) => {
        return user;
      });
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post("/getEnemy", async (req, res) => {
  const enemy = await User.findById(req.body.id);
  try {
    res.send(enemy);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
