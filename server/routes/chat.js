const express = require("express");
const app = express();
const router = require("express").Router();
const Message = require("../models/Message");

const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/conn", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const currentUser = await User.findById(id);
  const allUsers = await User.find();
  const users = allUsers.filter(
    (user) => user.username != currentUser.username
  );
  res.send(users);
});

router.post("/getMessages", async (req, res) => {
  try {
    const { from, to } = req.body;
    const receivedMessages = await Message.find({sender: to, receiver: from})
    const sentMessages = await Message.find({sender: from, receiver: to})
    let messages = [];
    receivedMessages.map((message) => messages.push(message))
    sentMessages.map((message) => messages.push(message))
    const projectedMessages = messages.map((msg) => {
      return { 
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
        date: msg.createdAt
      }
    })
    if (messages) res.send(projectedMessages.sort((a,b) => {return new Date(a.date - b.date)}))
  } catch (err) {
    res.send(err);
  }
});

router.post("/addMessage", async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: message,
      receiver: to,
      sender: from,
    });
    if (data) return res.send("message added successfully");
    return res.send("failed to add message");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
