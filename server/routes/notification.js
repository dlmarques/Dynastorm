const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Notification = require("../models/Notification");

router.post("/getNotifications", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const notification = await Notification.find({ id: id });
  res.send(notification);
});
router.patch("/readNotification", async (req, res) => {
  const id = jwt.decode(req.body.token, process.env.JWT_TOKEN);
  const notifications = await Notification.find({ id: id });
  const read = notifications.map(
    async (notification) =>
      await Notification.findByIdAndUpdate(notification._id, {
        $set: { read: true },
      })
  );
  res.send(read);
});

module.exports = router;
