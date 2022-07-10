const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors')

//import routes
const testRoute = require('./routes/test')
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");


dotenv.config();

app.use(cors())

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log('connected to DB')
);

//Middleware
app.use(express.json())

//route middlewares
app.use("/api", testRoute)
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)


app.listen(3001, () => console.log('server running'))