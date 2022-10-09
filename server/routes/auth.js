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
  
  if (error){
  if (error.details[0].message.includes("username")) {
      return res.status(400).send('Username is required');
     }
     if (error.details[0].message.includes("avatar")) {
        return res.status(400).send('Avatar is required');
     }
     if (
       error.details[0].message.includes("email")
     ) {
       return res.status(400).send('Email is required');
     }
     if(error.details[0].message.includes("password")){
      return res.status(400).send('Password must have at least 8 characters with one uppercase, one lowercase, one number and a special character');
    } 
  } 
 
  
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("Username already exists");

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
    money: 750,
    xp: 0,
    new: true,
    perk: " ",
    currentBoss: 1,
    busy: false,
    fighting: false,
  });

  try {
    await user.save();
    await Missions.insertMany([
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 3,
        level: 1,
        xpBoost: 10,
        money: 75,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 3,
        level: 1,
        xpBoost: 10,
        money: 75,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 3,
        level: 1,
        xpBoost: 10,
        money: 75,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 3,
        level: 1,
        xpBoost: 10,
        money: 75,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 3,
        level: 1,
        xpBoost: 10,
        money: 75,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 3,
        level: 1,
        xpBoost: 10,
        money: 75,
        status: "available",
      },
      /**/
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 7,
        level: 2,
        xpBoost: 10,
        money: 150,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 7,
        level: 2,
        xpBoost: 10,
        money: 150,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 7,
        level: 2,
        xpBoost: 10,
        money: 150,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 7,
        level: 2,
        xpBoost: 10,
        money: 150,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 7,
        level: 2,
        xpBoost: 10,
        money: 150,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 7,
        level: 2,
        xpBoost: 10,
        money: 150,
        status: "available",
      },
    
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 12,
        level: 3,
        xpBoost: 10,
        money: 175,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 12,
        level: 3,
        xpBoost: 10,
        money: 175,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 12,
        level: 3,
        xpBoost: 10,
        money: 175,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 12,
        level: 3,
        xpBoost: 10,
        money: 175,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 12,
        level: 3,
        xpBoost: 10,
        money: 175,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 12,
        level: 3,
        xpBoost: 10,
        money: 175,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 15,
        level: 4,
        xpBoost: 10,
        money: 200,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 15,
        level: 4,
        xpBoost: 10,
        money: 200,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 15,
        level: 4,
        xpBoost: 10,
        money: 200,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 15,
        level: 4,
        xpBoost: 10,
        money: 200,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 15,
        level: 4,
        xpBoost: 10,
        money: 200,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 15,
        level: 4,
        xpBoost: 10,
        money: 200,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 20,
        level: 5,
        xpBoost: 10,
        money: 225,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 20,
        level: 5,
        xpBoost: 10,
        money: 225,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 20,
        level: 5,
        xpBoost: 10,
        money: 225,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 20,
        level: 5,
        xpBoost: 10,
        money: 225,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 20,
        level: 5,
        xpBoost: 10,
        money: 225,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 20,
        level: 5,
        xpBoost: 10,
        money: 225,
        status: "available",
      },
     
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 25,
        level: 6,
        xpBoost: 10,
        money: 250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 25,
        level: 6,
        xpBoost: 10,
        money: 250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 25,
        level: 6,
        xpBoost: 10,
        money: 250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 25,
        level: 6,
        xpBoost: 10,
        money: 250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 25,
        level: 6,
        xpBoost: 10,
        money: 250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 25,
        level: 6,
        xpBoost: 10,
        money: 250,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 30,
        level: 7,
        xpBoost: 10,
        money: 300,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 30,
        level: 7,
        xpBoost: 10,
        money: 300,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 30,
        level: 7,
        xpBoost: 10,
        money: 300,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 30,
        level: 7,
        xpBoost: 10,
        money: 300,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 30,
        level: 7,
        xpBoost: 10,
        money: 300,
        status: "available",
      },
      {
        id: user._id,
        missionName: "Mission",
        description: "This is a mission to test it",
        duration: 30,
        level: 7,
        xpBoost: 10,
        money: 300,
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
  if(error){
    if(error.details[0].message.includes('email')){
      return res.status(400).send("Email is required");
    }
    if(error.details[0].message.includes('password')){
      return res.status(400).send("Password is required");
    }
  }
  

  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is incorrect");

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is incorrect");

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
