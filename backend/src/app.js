require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routers/user.routes");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);

module.exports = app;
