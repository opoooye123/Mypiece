const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
    getUsers,
} = require("../controllers/adminController");


router.get(
    "/users",
    protect,
    admin,
    getUsers
);

module.exports = router;

