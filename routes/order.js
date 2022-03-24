const express = require("express");
const router = express.Router();

const { newOrder, allOrders } = require("../controller/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
    .route("/admin/orders/")
    .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

module.exports = router;
