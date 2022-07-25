const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  avatar: {
    type: String,
    required: true,
    min: 6,
  },
  strength: {
    type: Number,
    required: true,
    min: 1,
  },
  armor: {
    type: Number,
    required: true,
    min: 1,
  },
  magic: {
    type: Number,
    required: true,
    min: 1,
  },
  magicResist: {
    type: Number,
    required: true,
    min: 1,
  },
  hp: {
    type: Number,
    required: true,
    min: 1,
  },
  money: {
    type: Number,
    required: true,
    min: 1,
  },
  xp: {
    type: Number,
    required: true,
    min: 0,
  },
  new: {
    type: Boolean,
    required: true,
    min: 0,
  },
  perk: {
    type: String,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
