const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    logout,
    allUsers,
} = require("../controller/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// admin
router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);

module.exports = router;
