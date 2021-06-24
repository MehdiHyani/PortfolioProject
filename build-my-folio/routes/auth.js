const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
  getUser,
} = require("../controllers/auth.js");

const { createPortfolio } = require("../controllers/protfolio.js");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/user/:token").get(getUser);

router.route("/create").post(createPortfolio);

module.exports = router;
