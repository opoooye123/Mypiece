const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload")
const cloudinary = require("../config/cloudinary");

const {protect} = require ("../middleware/authMiddleware");

const {vendorOnly} = require("../middleware/vendorMiddleware");

const {createProduct} = require("../controllers/productController");

const {getProducts} = require("../controllers/productController")

const {updateProduct} = require("../controllers/productController")

const {deleteProduct} =  require("../controllers/productController")

const {getVendorProducts} = require("../controllers/productController")

const {getProductById} = require("../controllers/productController")

const {createProductReview} = require("../controllers/productController");

//venor creates product
router.get("/", getProducts);
router.get("/my-products", protect,vendorOnly,getVendorProducts)
router.get("/:id", getProductById)
router.post("/",protect,vendorOnly,createProduct);
router.put("/:id", protect,vendorOnly,updateProduct);
router.delete("/:id",protect,vendorOnly,deleteProduct);


router.post(
  "/upload",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;

      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      const result =
        await cloudinary.uploader.upload(
          base64,
          {
            folder: "marketplace-products",
          }
        );

      res.json({
        imageUrl: result.secure_url,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.post(
  "/:id/reviews",
  protect,
  createProductReview
)

module.exports = router;