const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Notification = require("../models/Notification");
const Missions = require("../models/Missions");

router.post("/getMissions", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const missions = await Missions.find({ id: id._id });
  try {
    res.send(missions);
  } catch (err) {
    res.send(err);
  }
});

router.patch("/startMission", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const mission = await Missions.findByIdAndUpdate(req.body.id, {
    $set: { status: "in progress", date: req.body.startedTime },
  });
  const user = await User.findById(id);
  async function endMission() {
    await User.findByIdAndUpdate(id, {
      $set: {
        xp: user.xp + mission.xpBoost,
        money: user.money + mission.money,
      },
    });
    await Missions.findByIdAndUpdate(req.body.id, {
      $set: { status: "completed" },
    });
    new Notification({
      id: id,
      title: "Missions",
      description: `You have completed the ${mission.missionName}`,
      category: "missions",
      read: false,
    }).save();
  }
  if (mission && user) {
    setTimeout(endMission, mission.duration * 60 * 1000);
  }
});

module.exports = router;
