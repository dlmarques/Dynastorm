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
        const currentLevel = String(currentUser.xp)[0];
        const userLevel = String(user.xp)[0];
        return Number(currentLevel) === Number(userLevel);
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

router.patch("/startFight", async (req, res) => {
  const userId = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const enemyId = req.body.id;
  const currentUser = await User.findByIdAndUpdate(userId, {
    $set: { fighting: true },
  });
  if (userId && enemyId) {
    const enemy = await User.findById(enemyId);
    await new Notification({
      id: userId,
      title: "Arenas",
      description: `You start a fight with ${enemy.username}`,
      category: "arenas",
      read: false,
    }).save();
    await new Notification({
      id: enemyId,
      title: "Arenas",
      description: `${currentUser.username} starts a fight with you!`,
      category: "arenas",
      read: false,
    }).save();
    res.send("started");
  } else {
    res.send("error");
  }
});

router.patch("/attackEnemy", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const enemy = await User.findById(req.body.id);
  const user = await User.findById(id);
  const type = req.body.attack;

    if (type === "magic") {
      const diff = user.magic - enemy.magicResist;
      if (diff < 0) {
        res.send("nothing happens on your attack");
      } else if (diff === 0) {
        if (enemy.hp >= 10) {
          await User.findByIdAndUpdate(enemy._id, {
            $set: { hp: enemy.hp - 10 },
          });
        } else {
          await User.findByIdAndUpdate(enemy._id, { $set: { hp: 0 } });
        }
        res.send("you takes 10hp");
      } else if (diff > 0 && diff < enemy.magicResist * 0.5) {
        if (enemy.hp >= 25) {
          await User.findByIdAndUpdate(enemy._id, {
            $set: { hp: enemy.hp - 25 },
          });
        } else {
          await User.findByIdAndUpdate(enemy._id, { $set: { hp: 0 } });
        }
        res.send("you takes 25hp");
      } else if (diff > enemy.magicResist * 0.5) {
        if (enemy.hp >= 50) {
          await User.findByIdAndUpdate(enemy._id, {
            $set: { hp: enemy.hp - 50 },
          });
        } else {
          await User.findByIdAndUpdate(enemy._id, { $set: { hp: 0 } });
        }
        res.send("you takes 50hp");
      }
    } else if (type === "physical") {
      const diff = user.strength - enemy.armor;
      if (diff < 0) {
        res.send("nothing happens on your attack");
      } else if (diff === 0) {
        if (enemy.hp >= 10) {
          await User.findByIdAndUpdate(enemy._id, {
            $set: { hp: enemy.hp - 10 },
          });
        } else {
          await User.findByIdAndUpdate(enemy._id, { $set: { hp: 0 } });
        }
        res.send("you takes 10hp");
      } else if (diff > 0 && diff < enemy.armor * 0.5) {
        if (enemy.hp >= 25) {
          await User.findByIdAndUpdate(enemy._id, {
            $set: { hp: enemy.hp - 25 },
          });
        } else {
          await User.findByIdAndUpdate(enemy._id, { $set: { hp: 0 } });
        }
        res.send("you takes 25hp");
      } else if (diff > enemy.armor * 0.5) {
        if (enemy.hp >= 50) {
          await User.findByIdAndUpdate(enemy._id, {
            $set: { hp: enemy.hp - 50 },
          });
        } else {
          await User.findByIdAndUpdate(enemy._id, { $set: { hp: 0 } });
        }
        res.send("you takes 50hp");
      }
    } else {
      res.send("attacks doesnt exists");
    }


  
});

router.patch("/counterAttack", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const enemy = await User.findById(req.body.id);
  const user = await User.findById(id);
  const type = req.body.attack;


    if (enemy.hp <= 0) {
      res.send("You win");
    } else if (user.hp <= 0) {
      res.send(`${enemy.username} win`);
    } else {
      if (type === "magic") {
        const diff =  enemy.magic - user.magicResist;
        if (diff < 0) {
          res.send("nothing happens on counter attack");
        } else if (diff === 0) {
          if (user.hp > 10) {
            await User.findByIdAndUpdate(user._id, {
              $set: { hp: user.hp - 10 },
            });
          } else {
            await User.findByIdAndUpdate(user._id, { $set: { hp: 0 } });
            res.send(`${enemy.username} win`);
          }
        } else if (diff > 0 && diff < user.magicResist * 0.5) {
          if (user.hp > 25) {
            await User.findByIdAndUpdate(user._id, {
              $set: { hp: user.hp - 25 },
            });
          } else {
            await User.findByIdAndUpdate(user._id, { $set: { hp: 0 } });
            res.send(`${enemy.username} win`);
          }
        } else if (diff > user.magicResist * 0.5) {
          if (user.hp > 50) {
            await User.findByIdAndUpdate(user._id, {
              $set: { hp: user.hp - 50 },
            });
          } else {
            await User.findByIdAndUpdate(user._id, { $set: { hp: 0 } });
            res.send(`${enemy.username} win`);
          }
        }
      } else if (type === "physical") {
        const diff = enemy.strength - user.armor;
        if (diff < 0) {
          res.send("nothing happen on counter attack");
        } else if (diff === 0) {
          if (user.hp > 10) {
            await User.findByIdAndUpdate(user._id, {
              $set: { hp: user.hp - 10 },
            });
          } else {
            await User.findByIdAndUpdate(user._id, { $set: { hp: 0 } });
            res.send(`${enemy.username} win`);
          }
        } else if (diff > 0 && diff < user.armor * 0.5) {
          if (user.hp > 25) {
            await User.findByIdAndUpdate(user._id, {
              $set: { hp: user.hp - 25 },
            });
          } else {
            await User.findByIdAndUpdate(user._id, { $set: { hp: 0 } });
            res.send(`${enemy.username} win`);
          }
        } else if (diff > user.armor * 0.5) {
          if (user.hp > 50) {
            await User.findByIdAndUpdate(user._id, {
              $set: { hp: user.hp - 50 },
            });
          } else {
            await User.findByIdAndUpdate(user._id, { $set: { hp: 0 } });
            res.send(`${enemy.username} win`);
          }
        }
      }
    }
  

  
});

module.exports = router;
