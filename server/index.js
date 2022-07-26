const express = require("express");
const app = express();
const Boss = require("./models/Boss");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const inventoryRoute = require("./routes/inventory");
const healerRoute = require("./routes/healer");
const missionsRoute = require("./routes/missions");
const battlesRoute = require("./routes/battles");

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

app.listen(3001, () => console.log("server running"));
