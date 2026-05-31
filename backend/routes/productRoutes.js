const express = require("express");
const router = express.Router();


const {protect} = require ("../middleware/authMiddleware");

const {vendorOnly} = require("../middleware/vendorMiddleware");

const {createProduct} = require("../controllers/productController");

const {getProducts} = require("../controllers/productController")

const {updateProduct} = require("../controllers/productController")

const {deleteProduct} =  require("../controllers/productController")

const {getVendorProducts} = require("../controllers/productController")

const {getProductById} = require("../controllers/productController")
//venor creates product
router.get("/", getProducts);
router.get("/my-products", protect,vendorOnly,getVendorProducts)
router.get("/:id", getProductById)
router.post("/",protect,vendorOnly,createProduct);
router.put("/:id", protect,vendorOnly,updateProduct);
router.delete("/:id",protect,vendorOnly,deleteProduct)

module.exports = router;