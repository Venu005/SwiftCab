const express = require("express");
const {
  register,
  login,
  getCaptainProfile,
  logout,
} = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authCaptain, getCaptainProfile);
router.get("/logout", authCaptain, logout);
module.exports = router;
