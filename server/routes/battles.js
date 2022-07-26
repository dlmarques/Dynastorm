const router = require("express").Router();
const Boss = require("../models/Boss");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { increaseRuleOf3 } = require("../utils/ruleOf3");

router.get("/createBosses", async () => {
  const bosses = await Boss.find();
  if (bosses.length > 1) return;
  await Boss.insertMany([
    {
      boss: 1,
      bossName: "Crowspeak",
      strength: 150,
      armor: 200,
      magic: 80,
      magicResist: 250,
      hp: 100,
      specialItem: 1,
      boost: 200,
      stat: "magicResist",
      duration: 5,
    },
    {
      boss: 2,
      bossName: "Lightshorn",
      strength: 300,
      armor: 250,
      magic: 150,
      magicResist: 100,
      hp: 100,
      specialItem: 2,
      boost: 250,
      stat: "magicResist",
      duration: 5,
    },
    {
      boss: 3,
      bossName: "Mordath",
      strength: 10,
      armor: 70,
      magic: 15,
      magicResist: 80,
      hp: 100,
      specialItem: 3,
      boost: 300,
      stat: "strength",
      duration: 5,
    },
    {
      boss: 4,
      bossName: "Typhus",
      strength: 100,
      armor: 10,
      magic: 800,
      magicResist: 650,
      hp: 100,
      specialItem: 4,
      boost: 350,
      stat: "strength",
      duration: 5,
    },
    {
      boss: 5,
      bossName: "Raverclaw",
      strength: 500,
      armor: 450,
      magic: 320,
      magicResist: 450,
      hp: 100,
      specialItem: 5,
      boost: 400,
      stat: "armor",
      duration: 5,
    },
    {
      boss: 6,
      bossName: "Ferrous",
      strength: 650,
      armor: 600,
      magic: 300,
      magicResist: 750,
      hp: 100,
      specialItem: 6,
      boost: 450,
      stat: "magic",
      duration: 5,
    },
    {
      boss: 7,
      bossName: "Tempest",
      strength: 300,
      armor: 500,
      magic: 400,
      magicResist: 1000,
      hp: 100,
      specialItem: 7,
      boost: 500,
      stat: "magic",
      duration: 5,
    },
  ]);
});

router.get("/getBosses", async (req, res) => {
  const bosses = await Boss.find();
  res.send(bosses);
});

router.post("/fightBoss", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const user = await User.findById(id);
  const boss = await Boss.findById(req.body.bossId);

  async function fightBoss() {
    const boost = boss.boost;
    const skill = boss.stat;
    const averageBossSkills =
      (boss.strength + boss.magic + boss.armor + boss.magicResist) * boss.hp;
    const averageUserSkills =
      (user.strength + user.magic + user.armor + user.magicResist) * user.hp;

    if (averageBossSkills > averageUserSkills) {
      await User.findByIdAndUpdate(id, { $set: { hp: 0 } });
      res.send("defeat");
    } else {
      if (skill === "magic") {
        await User.findByIdAndUpdate(id, {
          $set: { magic: increaseRuleOf3(user.magic, boost, 1) },
        });
      } else if (skill === "strength") {
        await User.findByIdAndUpdate(id, {
          $set: { strength: increaseRuleOf3(user.strength, boost, 1) },
        });
      } else if (skill === "armor") {
        await User.findByIdAndUpdate(id, {
          $set: { armor: increaseRuleOf3(user.armor, boost, 1) },
        });
      } else if (skill === "magicResist") {
        await User.findByIdAndUpdate(id, {
          $set: { magicResist: increaseRuleOf3(user.magic, boost, 1) },
        });
      }
      res.send("win");
    }
  }
  fightBoss();
});

module.exports = router;
