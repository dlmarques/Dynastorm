const mongoose = require("mongoose");

const bossSchema = new mongoose.Schema({
  boss: {
    type: Number,
    required: true,
  },
  bossName: {
    type: String,
    required: true,
    max: 255,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Boss", bossSchema);
