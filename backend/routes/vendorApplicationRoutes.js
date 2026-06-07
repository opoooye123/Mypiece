const express = require("express");

const router = express.Router();

const {
  applyForVendor,
  getApplications,
  approveApplication,
  rejectApplication,
} = require(
  "../controllers/vendorApplicationController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const admin = require(
    "../middleware/adminMiddleware"
)

router.post(
  "/apply",
  protect,
  applyForVendor
);
router.get(
    "/",
    protect,
    admin,
    getApplications
);
router.put(
    "/:id/approve",
    protect,
    admin,
    approveApplication
);

router.put(
    "/:id/reject",
    protect,
    admin,
    rejectApplication
)

module.exports = router;