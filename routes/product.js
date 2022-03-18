const express = require("express");
const {
  newProduct,
  getProducts,
  getSingleProducts,
} = require("../controller/productController");
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProducts);

router.route("/admin/product/new").post(newProduct);

module.exports = router;
