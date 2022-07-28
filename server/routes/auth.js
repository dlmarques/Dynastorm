const router = require("express").Router();
const User = require("../models/User");
const Missions = require("../models/Missions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken = require("../utils/verifyToken");
const { registerValidation, loginValidation } = require("../utils/validation");

router.get("/isLoggedIn", verifyToken, (req, res) => {
  res.send(true);
});

//Register
router.post("/register", async (req, res) => {
  //Validate data before we a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    avatar: req.body.avatar,
    strength: 5,
    armor: 5,
    magic: 5,
    magicResist: 5,
    hp: 100,
    money: 5000,
    xp: 0,
    new: true,
    perk: " ",
    currentBoss: 1,
    busy: false
  });

  try {
    await user.save();
    await Missions.insertMany([
      {
        id: user._id,
        missionName: "First Mission",
        description: "This is a first mission to test it",
        duration: 1,
        level: 1,
        xpBoost: 10,
        money: 500,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Second Mission",
        description: "This is a second mission to test it",
        duration: 1,
        level: 1,
        xpBoost: 10,
        money: 500,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Third Mission",
        description: "This is a third mission to test it",
        duration: 1,
        level: 1,
        xpBoost: 10,
        money: 500,
        status: "available",
      },
      {
        id: user._id,
        missionName: "First Mission",
        description: "This is a first mission to test it",
        duration: 3,
        level: 2,
        xpBoost: 10,
        money: 1000,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Second Mission",
        description: "This is a second mission to test it",
        duration: 3,
        level: 2,
        xpBoost: 10,
        money: 1000,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Third Mission",
        description: "This is a third mission to test it",
        duration: 3,
        level: 2,
        xpBoost: 10,
        money: 1000,
        status: "available",
      },
      {
        id: user._id,
        missionName: "First Mission",
        description: "This is a first mission to test it",
        duration: 5,
        level: 3,
        xpBoost: 10,
        money: 1500,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Second Mission",
        description: "This is a second mission to test it",
        duration: 5,
        level: 3,
        xpBoost: 10,
        money: 1500,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Third Mission",
        description: "This is a third mission to test it",
        duration: 5,
        level: 3,
        xpBoost: 10,
        money: 1500,
        status: "available",
      },
      {
        id: user._id,
        missionName: "First Mission",
        description: "This is a first mission to test it",
        duration: 8,
        level: 4,
        xpBoost: 10,
        money: 1750,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Second Mission",
        description: "This is a second mission to test it",
        duration: 8,
        level: 4,
        xpBoost: 10,
        money: 2000,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Third Mission",
        description: "This is a third mission to test it",
        duration: 8,
        level: 4,
        xpBoost: 10,
        money: 2250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "First Mission",
        description: "This is a first mission to test it",
        duration: 10,
        level: 5,
        xpBoost: 10,
        money: 2500,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Second Mission",
        description: "This is a second mission to test it",
        duration: 10,
        level: 5,
        xpBoost: 10,
        money: 2750,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Third Mission",
        description: "This is a third mission to test it",
        duration: 10,
        level: 5,
        xpBoost: 10,
        money: 3000,
        status: "available",
      },
      {
        id: user._id,
        missionName: "First Mission",
        description: "This is a first mission to test it",
        duration: 13,
        level: 6,
        xpBoost: 10,
        money: 3250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Second Mission",
        description: "This is a second mission to test it",
        duration: 13,
        level: 6,
        xpBoost: 10,
        money: 3500,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Third Mission",
        description: "This is a third mission to test it",
        duration: 13,
        level: 6,
        xpBoost: 10,
        money: 3750,
        status: "available",
      },
      {
        id: user._id,
        missionName: "First Mission",
        description: "This is a first mission to test it",
        duration: 15,
        level: 7,
        xpBoost: 10,
        money: 4000,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Second Mission",
        description: "This is a second mission to test it",
        duration: 15,
        level: 7,
        xpBoost: 10,
        money: 4250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Third Mission",
        description: "This is a third mission to test it",
        duration: 15,
        level: 7,
        xpBoost: 10,
        money: 4500,
        status: "available",
      },
    ]);
    res.send("user and missions saved");
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //Validate data before we a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
  if (token) {
    return res.status(200).json({ authToken: token });
  }
  res.send("logged in!");
});

router.post("/getUserData", async (req, res) => {
  const decodedToken = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  try {
    const user = await User.findOne({ _id: decodedToken });
    if (!user) return res.status(400).send("User does not exist!");
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
