const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const BlacklistToken = require("../models/blacklistToken.model");
const Captain = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  // get the token
  //decode the token
  //compaer with the uer in the database
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const isblacklistToken = await BlacklistToken.findOne({ token });
  if (isblacklistToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id);
    req.user = user;

    return next(); // going to the next part/middleware
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const isblacklistToken = await BlacklistToken.findOne({ token });
  if (isblacklistToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decodeToken._id);
    req.captain = captain;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
