const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const VendorApplication = require("../models/VendorApplication")


const getAdminStats = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalVendors =
      await User.countDocuments({
        role: "vendor",
      });

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const pendingApplications =
      await VendorApplication.countDocuments({
        status: "Pending",
      });

    const orders =
      await Order.find();

    const revenue =
      orders.reduce(
        (acc, order) =>
          acc + order.totalPrice,
        0
      );

    res.json({
      totalUsers,
      totalVendors,
      totalProducts,
      totalOrders,
      pendingApplications,
      revenue,
    });
  } catch (error) {
  console.log("ADMIN STATS ERROR:");
  console.log(error);

  res.status(500).json({
    message: error.message,
  });
}
};




//GET ALL USERS
const getUsers = async (req,res) => {
    try {
        const users = await User.find({})
        .select("-password");

        res.json(users);
    }catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getUsers,
    getAdminStats
}