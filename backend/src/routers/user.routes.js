const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  getProfile,
  logout,
} = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  register
);

router.post("/login", login);
router.get("/profile", authUser, getProfile);
router.get("/logout", authUser, logout);
module.exports = router;
