const Captain = require("../models/captain.model");
const { validationResult } = require("express-validator");
const { createCaptain } = require("../services/captain.service");
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
  const { fullName, email, password, vehicle } = req.body;
  const decision = await aj.protect(req, {
    email,
  });
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
    return;
  }
  const captainExists = await Captain.findOne({ email });
  if (captainExists) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Captain already exists" }] });
  }
  const captain = await createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const captainWithoutPassword = await Captain.findById(captain._id).select(
    "-password"
  );
  const token = captain.genAuthToken();
  res.json({
    status: 200,
    success: true,
    data: { captainWithoutPassword, token },
  });
};

module.exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await Captain.findOne({ email }).select("+password"); // idhi lekapothe password radhu to compare\
    if (!captain) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Captain doesn't exist" }] });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Password is wrong" }] });
    }
    const token = captain.genAuthToken();
    res.cookie("token", token);
    res.json({ status: 200, success: true, data: { token, captain } });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  res.json({ status: 200, success: true, data: req.captain });
};

module.exports.logout = async (req, res) => {
  //clear the cokkie and set the token to be blacklisted
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlacklistToken.create({ token });

  res.json({ status: 200, success: true, data: {}, message: "Logged out" });
};
