const Order = require("../models/Order");

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
const getMyOrders = async (req,res) => {
    console.log("Controller reached")
    try {
        const orders = await Order.find({
            user: req.user._id,
        });

        console.log("Orders:", orders)
    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

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

    module.exports = {
        createOrder,
        getMyOrders,
        getOrderById
    }