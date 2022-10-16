const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http").Server(app);
const socketIO = require("socket.io");


const Notification = require("./models/Notification");

//import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const inventoryRoute = require("./routes/inventory");
const healerRoute = require("./routes/healer");
const missionsRoute = require("./routes/missions");
const battlesRoute = require("./routes/battles");
const notificationRoute = require("./routes/notification");
const arenasRoute = require("./routes/arenas");
const chatRoute = require("./routes/chat");
const shopRoute = require("./routes/shop");



dotenv.config();


app.use(cors());



mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async () => console.log("connected to DB")
);




//Middleware
app.use(express.json());

//route middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/healer", healerRoute);
app.use("/api/missions", missionsRoute);
app.use("/api/battles", battlesRoute);
app.use("/api/noti", notificationRoute);
app.use("/api/arenas", arenasRoute);
app.use("/api/chat", chatRoute);
app.use("/api/shop", shopRoute);


const port = process.env.PORT || 3001;
http.listen(port, () => console.log(`server running on ${port}`));

const io = socketIO(http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", async (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
      const newMessage = await Notification.create({
        id: data.from,
        title: "Messages",
        description: `You got a new message`,
        category: "message",
        read: false,
      });
      if (newMessage) console.log("notification sent");
    }
    const newMessage = await Notification.create({
      id: data.to,
      title: "Messages",
      description: `You got a new message`,
      category: "message",
      read: false,
    });
    if (newMessage) console.log("notification sent");
  });
});
