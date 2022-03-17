const express = require("express");
const router = express.Router();

const { registerUser } = require("../controller/authController");

router.route("/register").post(registerUser);

module.exports = router;
