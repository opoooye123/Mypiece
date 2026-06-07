const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
    getUsers,
    getAdminStats
} = require("../controllers/adminController");


router.get(
    "/users",
    protect,
    admin,
    getUsers
);
router.get(
    "/stats",
    protect,
    admin,
    getAdminStats
)

module.exports = router;

