const express = require("express");
const app = express();
const router = require("express").Router();
const Messages = require("../models/Message");

const User = require("../models/User");
const jwt = require("jsonwebtoken");


router.post('/conn', async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const currentUser = await User.findById(id)
  const allUsers = await User.find();
  const users = allUsers.filter((user) => user.username != currentUser.username )
  res.send(users)
})

router.post("/getMessages", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const messages = await Messages.find({ id: id._id });
  try {
    res.send(messages);
  } catch (err) {
    res.send(err);
  }
});



module.exports = router;
