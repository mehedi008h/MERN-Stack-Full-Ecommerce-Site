const express = require("express");
const router = express.Router();

const {
    newOrder,
    allOrders,
    updateOrder,
    deleteOrder,
    getSingleOrder,
    myOrders,
} = require("../controller/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// admin sections
router
    .route("/admin/orders/")
    .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
