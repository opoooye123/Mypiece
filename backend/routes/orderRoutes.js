const express = require("express");

const router = express.Router();

const {createOrder,
    getMyOrders,
    getOrderById,
    getVendorOrders,
    updateOrderStatus,
    createPaidOrder
} = require("../controllers/orderController");

const {protect,} =require("../middleware/authMiddleware");

router.post("/", protect, createOrder);

router.get("/vendor-orders", protect, getVendorOrders);

router.get("/my-orders", protect, getMyOrders);

router.put("/:id/status", protect, updateOrderStatus);

router.post(
  "/paid",
  protect,
  createPaidOrder
);

router.get("/:id", protect, getOrderById);


module.exports = router;