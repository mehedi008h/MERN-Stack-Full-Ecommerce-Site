const express = require("express");
const router = express.Router();

const { newOrder } = require("../controller/orderController");

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
