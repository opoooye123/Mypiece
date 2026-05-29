const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const {applyVendor} = require("../controllers/userController");

router.get("/profile", protect, (req,res) => {
    res.json(req.user);
});

router.patch("/apply-vendor", protect, applyVendor);

module.exports = router;