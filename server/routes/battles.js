const router = require("express").Router();
const Boss = require("../models/Boss");

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
      },
      {
        boss: 2,
        bossName: "Lightshorn",
        strength: 300,
        armor: 250,
        magic: 150,
        magicResist: 100,
        hp: 100,
      },
      {
        boss: 3,
        bossName: "Mordath",
        strength: 10,
        armor: 70,
        magic: 15,
        magicResist: 80,
        hp: 100,
      },
      {
        boss: 4,
        bossName: "Typhus",
        strength: 100,
        armor: 10,
        magic: 800,
        magicResist: 650,
        hp: 100,
      },
      {
        boss: 5,
        bossName: "Raverclaw",
        strength: 500,
        armor: 450,
        magic: 320,
        magicResist: 450,
        hp: 100,
      },
      {
        boss: 6,
        bossName: "Ferrous",
        strength: 650,
        armor: 600,
        magic: 300,
        magicResist: 750,
        hp: 100,
      },
      {
        boss: 7,
        bossName: "Tempest",
        strength: 300,
        armor: 500,
        magic: 400,
        magicResist: 1000,
        hp: 100,
      },
    ]);
});

router.get("/getBosses", async (req, res) => {
  const bosses = await Boss.find();
    res.send(bosses)
});

module.exports = router;
