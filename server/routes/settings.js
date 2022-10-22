const router = require("express").Router();
const dotenv = require("dotenv");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config();

router.patch("/changePassword", async (req, res) => {
  const { token, password, newPassword } = req.body;
  console.log(token, password, newPassword);
  const id = jwt.decode(token, process.env.JWT_TOKEN);
  const user = await User.findById(id);

  if (!user) return res.status(404).send("User not found");

  if(password && newPassword){
//verify old password
const validPass = await bcrypt.compare(password, user.password);

if (validPass) {
  if (
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,1024}$/.test(
      newPassword
    )
  ) {
    try {
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);
      const passwordChanged = await User.findByIdAndUpdate(id, {
        $set: { password: newHashedPassword },
      });
      if (passwordChanged) res.status(200).send("password changed");
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res
      .status(400)
      .send(
        "New password must have at least 8 characters with one uppercase, one lowercase, one number and a special character"
      );
  }
} else {
  res.status(400).send("Old password was wrong");
}
  }
  
});

router.post("/deleteAccount", async (req, res) => {
  const token  = req.body.token;
  const id = jwt.decode(token, process.env.JWT_TOKEN);

  try {
    const userDeleted = await User.deleteOne({_id: id});
    if(userDeleted) return res.status(200).send(userDeleted)
  } catch (error) {
    res.status(400).send(error)
  }
});

module.exports = router;
