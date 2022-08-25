const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http").Server(app);
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");
const socketIO = require("socket.io")
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

dotenv.config();

app.use(cors());

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async () => console.log("connected to DB")
);

//Middleware
app.use(express.json());


/* io.on("connection", (socket) => {
  socket.on("message", async (data) => {
    socketIO.emit('messageResponse', data);
    const senderId = jwt.decode(data.sender, process.env.JWT_TOKEN);
    if (data.sender.trim() && data.receiver.trim()) {
      try {
        await new Message({
          senderId: senderId,
          receiverId: data.receiver,
          message: data.text,
        }).save();
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data)
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
}); */

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

http.listen(3001, () => console.log("server running"));

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
    onlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve", data.message)
    }
  })
})