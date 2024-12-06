const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const { asyncHandler } = require("../utils/asynchandler");
const { createUser } = require("../services/user.service");
const BlacklistToken = require("../models/blacklistToken.model");

let aj;

const initializeArcjet = async () => {
  const arcjet = await import("@arcjet/node");
  aj = arcjet.default({
    key: process.env.ARCJET_KEY,
    rules: [
      arcjet.validateEmail({
        mode: "LIVE", 

        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      }),
    ],
  });
};

initializeArcjet();

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;
  const decision = await aj.protect(req, {
    email,
  });
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
    return;
  }
  //password already hashed in 'pre'

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }
  const user = await createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password,
  });
  const userWithoutPassword = await User.findById(user._id).select("-password");
  const token = user.genAuthToken();
  res.json({
    status: 200,
    success: true,
    data: { userWithoutPassword, token },
  });
};

module.exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); // idhi lekapothe password radhu to compare\
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User doesn't exist" }] });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Password is wrong" }] });
    }
    const token = user.genAuthToken();
    res.cookie("token", token);
    res.json({ status: 200, success: true, data: { token, user } });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProfile = async (req, res) => {
  res.json({ status: 200, success: true, data: req.user });
};

module.exports.logout = async (req, res) => {
  //clear the cokkie and set the token to be blacklisted
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlacklistToken.create({ token });

  res.json({ status: 200, success: true, data: {}, message: "Logged out" });
};
