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

router.post("/attackEnemy", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const enemy = await User.findById(req.body.id);
  const user = await User.findById(id)
  //if user and enemy exists
  if(user && enemy){
    //average skills
    const enemyAverageSkills = enemy.strength + enemy.magic + enemy.armor + enemy.magicResist;
    const userAverageSkills = user.strength + user.magic + user.armor + user.magicResist;
    //if user is stronger than enemy
    if(enemyAverageSkills < userAverageSkills){
      //overall difference between user and enemy
      const diff = userAverageSkills - enemyAverageSkills;
      //if diff is equal or more than 50%
      if(diff >= userAverageSkills * 0.5){
        const userProb = [1, 2, 3, 4, 5, 6, 7, 8];
        const enemyProb = [9 , 10];
        const random = Math.floor(Math.random() * 10 + 1);
        if(userProb.includes(random)){
          res.send("user win")
        }else if(enemyProb.includes(random)){
          res.send("enemy win")
        }
        
      }else{
        const userProb = [1, 2, 3, 4, 5, 6, 7];
        const enemyProb = [8, 9 , 10];
        const random = Math.floor(Math.random() * 10 + 1);
        if(userProb.includes(random)){
          res.send("user win")
        }else if(enemyProb.includes(random)){
          res.send("enemy win")
        }
      }
       //if average skills are equal 
    }else  if(enemyAverageSkills === userAverageSkills){
        const userProb = [1, 2, 3, 4, 5];
        const enemyProb = [6, 7, 8, 9, 10];
        const random = Math.floor(Math.random() * 10 + 1);
        if(userProb.includes(random)){
          res.send("user win")
        }else if(enemyProb.includes(random)){
          res.send("enemy win")
        }
    }else if (enemyAverageSkills > userAverageSkills){
      const diff = enemyAverageSkills - userAverageSkills;
      if(diff >= enemyAverageSkills * 0.5){
        const enemyProb = [1, 2, 3, 4, 5, 6, 7, 8];
        const userProb = [9 , 10];
        const random = Math.floor(Math.random() * 10 + 1);
        if(enemyProb.includes(random)){
          res.send("enemy win")
        }else if(userProb.includes(random)){
          res.send("user win")
        }
      }else {
        const enemyProb = [1, 2, 3, 4, 5, 6, 7];
        const userProb = [8, 9 , 10];
        const random = Math.floor(Math.random() * 10 + 1);
        if(userProb.includes(random)){
          res.send("user win")
        }else if(enemyProb.includes(random)){
          res.send("enemy win")
        }
      }
    }
  }

});

module.exports = router;
