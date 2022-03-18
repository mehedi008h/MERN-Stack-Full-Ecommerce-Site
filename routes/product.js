const express = require("express");
const { newProduct, getProducts } = require("../controller/productController");
const router = express.Router();

router.route("/admin/product/new").post(newProduct);
router.route("/products").get(getProducts);

module.exports = router;
