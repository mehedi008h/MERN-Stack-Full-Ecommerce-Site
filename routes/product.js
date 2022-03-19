const express = require("express");
const {
    newProduct,
    getProducts,
    getSingleProducts,
    getAdminProducts,
    updateProduct,
    deleteProduct,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProducts);

router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/admin/products").get(getAdminProducts);
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
