const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const { asyncHandler } = require("../utils/asynchandler");
const { createUser } = require("../services/user.service");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;
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
