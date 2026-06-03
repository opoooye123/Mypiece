const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    orderItems: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
              required:true,
            },
            name: {
                type: String,
                required: true,
            },

            image: {
                type: String,
                required: true,
            },

            qty: {
                type: Number,
                required: true,
            },
          },
    ],

    shippingAddress: {
        address : {
            type: String,
            rquired: true,
        },

        city: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },

    isPaid: {
        type: Boolean,
        default: false,
    },

    paidAt: {
        type: Date,
    },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);