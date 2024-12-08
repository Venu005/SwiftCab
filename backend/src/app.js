require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routers/user.routes");
const captainRoutes = require("./routers/captain.routes");
const app = express();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
0;

module.exports = app;
