const Order = require("../models/Order");
const Product = require("../models/Product")

console.log(Order);

//Create Order
const createOrder = async (req,res) => {
    try {
         const {
            orderItems,
            shippingAddress,
            totalPrice,
         } = req.body;

         const order = await Order.create({
            user: req.user._id,
            orderItems,
            shippingAddress,
            totalPrice,
         });

         res.status(201).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Get My Orders
const getMyOrders = async (req, res) => {
    console.log("Controller reached");

    try {
        const orders = await Order.find({
            user: req.user._id,
        });

        console.log("Orders:", orders);

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//Get Order By ID

    const getOrderById = async(req,res) => {
        try{
            const order = await Order.findById(
                req.params.id
            ).populate(
                "user",
                "name email"
            );

            if(!order){
                return res.status(404).json({
                    message: "Order not found",
                });
            }
            res.json(order);
        }catch(error){
            res.status(500).json({
                message: error.message,
            });
        }
    };

  const getVendorOrders = async (req, res) => {
  try {
    console.log("Vendor user:", req.user);

    const products = await Product.find({
      vendor: req.user._id,
    });

    console.log("Products:", products);

    const productIds = products.map(
      (product) => product._id
    );

    console.log("Product IDs:", productIds);

    const orders = await Order.find({
      "orderItems.product": {
        $in: productIds,
      },
    }).populate("user", "name email");

    console.log("Orders:", orders);

    res.json(orders);

  } catch (error) {
    console.log("Vendor Orders Error:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

    const updateOrderStatus = async (req,res) => {
        try {
            console.log("UPDATE HIT");
    console.log(req.body);
             const order = await Order.findById(
                req.params.id
             );

             if(!order) {
                return res.status(404).json({
                    message: "Order not found",
                });
             }

             order.orderStatus = 
               req.body.orderStatus;

               await order.save();

               res.json(order);

        } catch (error) {

            console.log(error);
            
            res.status(500).json({
                message: error.message,
            })
        }
    }

    module.exports = {
        createOrder,
        getMyOrders,
        getOrderById,
        getVendorOrders,
        updateOrderStatus,
    }