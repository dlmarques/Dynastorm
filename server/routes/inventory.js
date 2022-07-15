const router = require("express").Router();
const Inventory = require("../models/Inventory");
const { decreaseRuleOf3, increaseRuleOf3 } = require("../utils/ruleOf3");
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

  if (user.money < req.body.price) {
    res.send("You dont have enough money");
  } else {
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
        const boost = req.body.boost;
        if (req.body.itemSkill === "magic") {
          await User.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                magic: increaseRuleOf3(user.magic, boost, req.body.quantity),
              },
            }
          );
        } else if (req.body.itemSkill === "speed") {
          await User.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                speed: increaseRuleOf3(user.speed, boost, req.body.quantity),
              },
            }
          );
        } else if (req.body.itemSkill === "stamina") {
          await User.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                stamina: increaseRuleOf3(
                  user.stamina,
                  boost,
                  req.body.quantity
                ),
              },
            }
          );
        } else if (req.body.itemSkill === "strength") {
          await User.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                strength: increaseRuleOf3(
                  user.strength,
                  boost,
                  req.body.quantity
                ),
              },
            }
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
          price: req.body.price,
          boost: req.body.boost,
        });
        await newItem.save();
        if (user) {
          await User.findOneAndUpdate(
            { _id: id },
            { $set: { money: user.money - req.body.price } }
          );
          const boost = req.body.boost;
          if (req.body.itemSkill === "magic") {
            await User.findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  magic: increaseRuleOf3(user.magic, boost, req.body.quantity),
                },
              }
            );
          } else if (req.body.itemSkill === "speed") {
            await User.findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  speed: increaseRuleOf3(user.speed, boost, req.body.quantity),
                },
              }
            );
          } else if (req.body.itemSkill === "stamina") {
            await User.findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  stamina: increaseRuleOf3(
                    user.stamina,
                    boost,
                    req.body.quantity
                  ),
                },
              }
            );
          } else if (req.body.itemSkill === "strength") {
            await User.findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  strength: increaseRuleOf3(
                    user.strength,
                    boost,
                    req.body.quantity
                  ),
                },
              }
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
  }
});

router.post("/getItems", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const items = await Inventory.find({ id: id });
  try {
    res.send(items);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/sellItem", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const user = await User.findById(id);
  const item = await Inventory.findById(req.body.id);
  const boost = item.boost;
  //if user and item exists
  if (item && user) {
    //if item quantity bigger than 1
    if (item.quantity > 1) {
      //if item skill equals magic
      if (item.itemSkill === "magic") {
        try {
          await User.findByIdAndUpdate(id, {
            $set: {
              money: user.money + item.price / 2,
            },
          });
          await User.findByIdAndUpdate(id, {
            $set: { magic: decreaseRuleOf3(user.magic, boost) },
          });
          await Inventory.findOneAndUpdate(
            { itemName: item.itemName },
            {
              $set: { quantity: item.quantity - 1 },
            }
          );
          res.send("success");
        } catch (err) {
          res.send(err);
        }
        //if item skill equals stamina
      } else if (item.itemSkill === "stamina") {
        try {
          await User.findByIdAndUpdate(id, {
            $set: {
              money: user.money + item.price / 2,
              stamina: decreaseRuleOf3(user.stamina, boost),
            },
          });
          await Inventory.findOneAndUpdate(
            { itemName: item.itemName },
            {
              $set: { quantity: item.quantity - 1 },
            }
          );
          res.send("success");
        } catch (err) {
          res.send(err);
        }
        //if item skill equals speed
      } else if (item.itemSkill === "speed") {
        try {
          await User.findByIdAndUpdate(id, {
            $set: {
              money: user.money + item.price / 2,
              speed: decreaseRuleOf3(user.speed, boost),
            },
          });
          await Inventory.findOneAndUpdate(
            { itemName: item.itemName },
            {
              $set: { quantity: item.quantity - 1 },
            }
          );
          res.send("success");
        } catch (err) {
          res.send(err);
        }
        //if item skill equals strength
      } else if (item.itemSkill === "strength") {
        try {
          await User.findByIdAndUpdate(id, {
            $set: {
              money: user.money + item.price / 2,
              strength: decreaseRuleOf3(user.strength, boost),
            },
          });
          await Inventory.findOneAndUpdate(
            { itemName: item.itemName },
            {
              $set: { quantity: item.quantity - 1 },
            }
          );
          res.send("success");
        } catch (err) {
          res.send(err);
        }
      } else {
        res.send(error);
      }
      //if item quantity equal to 1
    } else {
      if (item.itemSkill === "magic") {
        try {
          await User.findByIdAndUpdate(id, {
            $set: {
              money: user.money + item.price / 2,
              magic: decreaseRuleOf3(user.magic, boost),
            },
          });
          await Inventory.findByIdAndDelete(item._id);
          res.send("success");
        } catch (err) {
          res.send(err);
        }
        //if item skill equals stamina
      } else if (item.itemSkill === "stamina") {
        try {
          await User.findByIdAndUpdate(id, {
            $set: {
              money: user.money + item.price / 2,
              stamina: decreaseRuleOf3(user.stamina, boost),
            },
          });
          await Inventory.findByIdAndDelete(item._id);
          res.send("success");
        } catch (err) {
          res.send(err);
        }
        //if item skill equals speed
      } else if (item.itemSkill === "speed") {
        try {
          await User.findByIdAndUpdate(id, {
            $set: {
              money: user.money + item.price / 2,
              speed: decreaseRuleOf3(user.speed, boost),
            },
          });
          await Inventory.findByIdAndDelete(item._id);
          res.send("success");
        } catch (err) {
          res.send(err);
        }
        //if item skill equals strength
      } else if (item.itemSkill === "strength") {
        try {
          await User.findByIdAndUpdate(id, {
            $set: {
              money: user.money + item.price / 2,
              strength: decreaseRuleOf3(user.strength, boost),
            },
          });
          await Inventory.findByIdAndDelete(item._id);
          res.send("success");
        } catch (err) {
          res.send(err);
        }
      } else {
        res.send(error);
      }
    }
    //if item does not exist
  } else {
    res.send("item not found");
  }
});

module.exports = router;
