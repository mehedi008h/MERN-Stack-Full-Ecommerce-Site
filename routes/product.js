const express = require("express");
const { newProduct } = require("../controller/productController");
const router = express.Router();

router.route("/admin/product/new").post(newProduct);

module.exports = router;
