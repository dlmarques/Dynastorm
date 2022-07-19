const mongoose = require("mongoose");

const missionsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  missionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  xpBoost: {
    type: Number,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
  },
});

module.exports = mongoose.model("Missions", missionsSchema);
